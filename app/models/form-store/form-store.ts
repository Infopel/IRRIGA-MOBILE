import { FormApi, FormContent, FormType, GetFormResult } from "api"
import { isEqual, isNil } from "lodash"
import {
  applySnapshot,
  flow,
  getSnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree"
import { FieldOutput, FieldOutputModel } from "models/field-output/field-output"
import { FieldsetModel } from "models/fieldset/fieldset"
import { FormModel, FormSnapshot } from "models/form/form"
import { SubformModel } from "models/subform/subform"
import UUID from "react-native-uuid"
import { database, Form } from "storage"
import { addOrUpdateForm } from "storage/mutations/form"
import logger from "utils/logger"
import { load, save } from "utils/storage"
import { withEnvironment } from "../extensions/with-environment"
import { Field, FieldModel } from "../field/field"
import { getLocalFormFromType, parseAllSubformsOutput } from "./helper"
/**
 * Model description here for TypeScript hints.
 */

export const FormStoreModel = types
  .model("FormStore")
  .props({
    form: types.maybe(FormModel),
    secundaryForm: types.optional(types.array(FormModel), []),
    currentPage: types.number,
    isFormSubmitted: false,
    error: types.maybe(types.string),
    isRequestingForm: false,
    subformsOutput: types.map(SubformModel),
    output: types.optional(types.array(FieldOutputModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get fieldset() {
      const { form } = self
      return form?.fieldset
    },
    get allFields(): Field[] | undefined {
      return self.form?.fields
    },
  }))

  .views((self) => ({
    getField: (id: string, formId: string): Field | undefined => {
      let fieldset: Instance<typeof FieldsetModel>[] | undefined

      if (!self.form) {
        logger.error("form is undefined")
        return
      }

      const forms = [self.form, ...(self.secundaryForm ?? [])]

      fieldset = forms.find(({ id }) => id == formId)?.fieldset

      if (!fieldset) return
      for (let i = 0; i < fieldset?.length ?? 0; i++) {
        for (let j = 0; j < fieldset[i].controls.length; j++) {
          const element = fieldset[i].controls[j]

          if (element.id === id) return element
        }
      }
    },
    getFieldOutput(fieldId: string): FieldOutput | undefined {
      return self.output.find((field) => {
        return field.input.id == fieldId
      })
    },
  }))
  .views((self) => ({
    getAllFieldsFromForm(fieldId: string, parentFormId: string) {
      const field = self.getField(fieldId, parentFormId)
      const formId = field?.value

      if (!formId) return undefined

      const form: Instance<typeof FormModel> | undefined = self.secundaryForm.find(
        ({ id }) => id === formId,
      )

      if (!form) return undefined

      const fields: Instance<typeof FieldModel>[] = []

      form.fieldset.forEach((field) => {
        fields.push(...field.controls)
      })

      return { fields, formId }
    },
    get fieldsFromCurrentPage() {
      const { currentPage, fieldset } = self
      if (currentPage === undefined) return
      if (!fieldset) return
      const page = fieldset[currentPage]
      if (!page) return
      return page.controls
    },
    get pageInfo() {
      if (self.currentPage === undefined) return
      if (!self.fieldset) return
      const page = self.fieldset[self.currentPage]
      if (!page) return

      return {
        pageNumber: self.currentPage + 1,
        lastPage: self.fieldset.length === self.currentPage + 1,
        firstPage: self.currentPage === 0,
        pageTitle: page.label,
        totalPages: self.fieldset.length,
      }
    },

    getSubformOutput(fieldId: string, formId: string): { id: string; name: string }[] {
      return parseAllSubformsOutput(self.subformsOutput.values(), fieldId, formId)
    },
  }))
  .actions((self) => ({
    prepareFieldForUpdate: (id: string) => {
      let fieldInput: Instance<typeof FieldModel> | undefined
      const form: Instance<typeof FormModel> | undefined = [self.form, ...self.secundaryForm].find(
        (form) => {
          if (isNil(form)) {
            return
          }
          return form.fieldset.find((set) =>
            set.controls.find((field) => {
              fieldInput = field
              return field.id === id
            }),
          )
        },
      )

      if (isNil(form) || isNil(fieldInput)) {
        console.log("could not find form for field with id", id)
        return
      }

      let field = self.output.find((field) => id === field.input.id)
      if (!field) {
        field = FieldOutputModel.create({ input: fieldInput.id, form: form.id })
        self.output.push(field)
      }
      return field
    },
  }))
  .actions((self) => ({
    updateField: (id: string, value?: string | string[]) => {
      const field = self.prepareFieldForUpdate(id)
      if (field) {
        field?.set(value)
        if (!Array.isArray(value) && value) {
          field.input?.notifyQueryField(parseInt(value), field)
        }
      }
    },
  }))
  .actions((self) => ({
    isPageWithValidInputs(currentPage: number, form: Instance<typeof FormModel>): boolean {
      const { fieldset } = form
      if (currentPage === undefined) return false
      if (!fieldset) return false
      const page = fieldset[currentPage]
      if (!page) return false
      const isValid = page.controls.every((field) => {
        const isRequired = field.validators?.required
        if (!isRequired) return true

        if (field.isDisabled) return true
        let output = self.getFieldOutput(field.id)
        if (!output) {
          self.updateField(field.id, undefined)
        }
        output = self.getFieldOutput(field.id)
        if (!output) return false
        if (field.type === "form") {
          let isValidSubform = false

          for (const [key, subform] of self.subformsOutput) {
            isValidSubform = subform.form.id === field.value
            if (isValidSubform) break
          }

          //@ts-ignore
          self.setFieldError(
            field.id,
            isValidSubform ? undefined : "Deve preencher ao menos um Formulário",
          )
          return isValidSubform
        }
        if (output.error) return false
        return (output.value || output.multiValue).length > 0
      })

      if (isValid) {
        self.error = undefined
      } else {
        self.error = "Preencha todos os campos obrigatórios"
      }

      return isValid
    },
  }))
  .actions((self) => ({
    resetSubform: (formId: string) => {
      self.output
        .filter((field) => {
          return field.form.id === formId
        })
        .forEach((field) => {
          field.value = undefined
          field.multiValue.clear()
        })
    },

    changePage: function (pageNumber: number) {
      const { currentPage, form, isPageWithValidInputs } = self
      if (!form) {
        return
      }

      if (currentPage < pageNumber) {
        if (!isPageWithValidInputs(currentPage, form)) {
          return
        }
      }

      if (currentPage !== undefined && !form) return

      if (currentPage === pageNumber) return

      console.log({ currentPage, pageNumber })

      self.currentPage = pageNumber

      save("formStore", getSnapshot(self))
        .then((res) => {
          logger.log("formStore saved", res)
        })
        .catch((err) => {
          console.error(err)
        })
    },
  }))
  .actions((self) => {
    const saveForm = flow(function* () {
      if (isNil(self.form) || isNil(self.allFields)) return
      if (!self.isPageWithValidInputs(self.form.fieldset.length - 1, self.form)) return

      try {
        const form = (yield database.get<Form>(Form.table).find(self.form.id)) as Form
        yield form.saveForm(
          self.output.map((field) => {
            return { fieldId: field.input.id, response: field.value ?? field.multiValue }
          }),
          UUID.v4().toString(),
        )
        save("formStore", null)
          .then((res) => {
            logger.log("formStore saved", res)
          })
          .catch((err) => {
            console.error(err)
          })
        self.isFormSubmitted = true
      } catch (e) {
        //@ts-ignore
        logger.error(e)
      }
    })
    const _requestPreviousForm = flow(function* () {
      self.isRequestingForm = true
      try {
        const snap = yield load("formStore")
        applySnapshot(self, snap ?? {})
      } catch (e) {
        logger.error(e)
        self.error = "Nao Foi possível carregar o formulário anterior"
      }
      self.isRequestingForm = false
    })
    const _requestForm = flow(function* (type: FormType) {
      self.form = undefined
      self.currentPage = 0
      self.isFormSubmitted = false
      self.isRequestingForm = true
      self.output.clear()
      self.subformsOutput.clear()
      self.secundaryForm.clear()
      self.error = undefined
      try {
        const api = new FormApi(self.environment.api)
        const response: GetFormResult = yield api.getForm(FormApi.mapForm(type))
        console.log({ response })
        logger.log({ response })
        if (response.kind === "ok") {
          const form: Form = response.result.main as any
          const otherForms: Form[] = response.result.others as any
          self.form = FormModel.create(form)
          self.secundaryForm.push(...otherForms)
          //@ts-ignore
          yield addOrUpdateForm(database, [form, ...otherForms])
        } else {
          try {
            const allForms = (yield getLocalFormFromType(type)) as FormSnapshot[]
            self.form = FormModel.create(allForms[0])
            allForms.splice(0, 1)
            self.secundaryForm.push(...allForms)
            self.error =
              "Não e possível conectar a internet neste momento. \n Verifique a conexão com a internet"
          } catch (e) {
            console.log({ e })
            logger.error(e)
          }
        }
        self.isRequestingForm = false
      } catch (e) {
        logger.error(e)
        self.isRequestingForm = false
        self.form = undefined
        self.error = "Não foi possível carregar o formulário"
      }
    })

    const clearForm = () => {
      self.form = undefined
      self.currentPage = 0
      self.isRequestingForm = true
      self.isFormSubmitted = true
      self.output.clear()
      self.subformsOutput.clear()
      self.secundaryForm.clear()
      self.error = undefined
      console.warn("cancelRequestForm method not implemented")
    }
    return {
      _requestForm,
      cancelRequestForm: clearForm,
      nextPage: () => {
        const { currentPage } = self
        self.changePage(currentPage + 1)
      },
      previousPage: () => {
        const { currentPage } = self
        self.changePage(currentPage - 1)
      },

      setFieldError: (id: string, error?: string) => {
        let field = self.getFieldOutput(id)
        if (!field) {
          self.updateField(id, undefined)
        }
        field = self.getFieldOutput(id)
        if (field) field.error = error
      },
      setFieldWarn: (id: string, error?: string) => {
        let field = self.getFieldOutput(id)
        if (!field) {
          self.updateField(id, undefined)
        }
        field = self.getFieldOutput(id)
        if (field) field.warn = error
      },
      saveForm: () => saveForm().then().catch(),
      requestPreviousForm: () => _requestPreviousForm().then(),
      clearForm,
      saveSubform: (formFieldId: string, formId: string, parentForm: string): boolean => {
        const form = self.secundaryForm.find((form) => form.id === formId)
        if (!form) return false

        if (!self.isPageWithValidInputs(0, form)) return false
        const id = UUID.v4().toString()

        const output = self.output.filter((field) => field.form.id === formId)

        const labelField = output.find((field) => field.input.id === form.fields[0].id)

        if (!labelField) {
          logger.log("labelField is null")
          return false
        }

        for (const [subformId, { formField, labelFieldOutput }] of self.subformsOutput) {
          if (form.id !== formId) {
            continue
          }
          if (formFieldId !== formField.id) {
            continue
          }

          if (!labelFieldOutput) {
            logger.log("labelFieldOutput is null")
            return false
          }

          if (labelField.value) {
            if (labelField.value === labelFieldOutput.value) {
              labelField.error = "Já existe um subformulário com este nome"
              return false
            }
          } else if (isEqual(labelField.multiValue, labelFieldOutput.multiValue)) {
            labelField.error = "Já existe um subformulário com este nome"
            return false
          }
        }

        self.subformsOutput.put({
          id,
          formField: formFieldId,
          parentForm: parentForm,
          labelField: labelField.input.id,
          output: output.map((field) => getSnapshot(field)),
        })
        //@ts-ignore
        self.setFieldError(formFieldId, undefined)
        self.resetSubform(formId)
        return true
      },
      updateSubform: (formFieldId: string, formId: string, savedSubfomId: string): boolean => {
        const form = self.secundaryForm.find((form) => form.id === formId)
        if (!form) return false

        if (!self.isPageWithValidInputs(0, form)) return false

        const output = self.output.filter((field) => field.form.id === formId)
        const labelField = output.find((field) => field.input.id === form.fields[0].id)

        if (!labelField) {
          logger.log("labelField is null")
          return false
        }
        for (const [subformId, { labelFieldOutput }] of self.subformsOutput) {
          if (form.id !== formId) {
            continue
          }

          if (subformId === savedSubfomId) {
            continue
          }

          if (!labelFieldOutput) {
            logger.log("labelFieldOutput is null")
            return false
          }

          if (labelField.value) {
            if (labelField.value === labelFieldOutput.value) {
              labelField.error = "Já existe um subformulário com este nome"
              return false
            }
          } else if (isEqual(labelField.multiValue, labelFieldOutput.multiValue)) {
            labelField.error = "Já existe um subformulário com este nome"
            return false
          }
        }

        const savedSubformOutput = self.subformsOutput.get(savedSubfomId)?.output
        if (!savedSubformOutput) {
          logger.log("savedSubformOutput is null")
          return false
        }
        savedSubformOutput.clear()
        savedSubformOutput.push(...output.map((field) => getSnapshot(field)))

        //@ts-ignore
        self.setFieldError(formFieldId, undefined)
        self.resetSubform(formId)
        return true
      },
      setSubformOutput: (savedSubfomId: string) => {
        const subform = self.subformsOutput.get(savedSubfomId)
        if (subform && subform.output.length > 0) {
          subform.output.forEach((subformOutputField) => {
            const fieldOutput = self.output.find(
              (field) => field.input.id === subformOutputField.input.id,
            )
            if (fieldOutput) {
              fieldOutput.value = subformOutputField.value
              fieldOutput.multiValue.clear()
              fieldOutput.multiValue.push(...subformOutputField.multiValue)
            } else if (subformOutputField.value || subformOutputField.multiValue.length > 0) {
              self.output.push(getSnapshot(subformOutputField))
            }
          })
        }
      },
      deleteSubformOutput: (savedSubfomId: string) => {
        const subform = self.subformsOutput.get(savedSubfomId)
        if (subform) {
          self.resetSubform(subform.form.id)
          self.subformsOutput.delete(savedSubfomId)
        }
      },
      requestForm: (type: FormType) => {
        _requestForm(type)
          .then((res) => {
            console.log("🚀 ~ file: form-store.ts ~ line 115 ~ .actions ~ res", res)
          })
          .catch((error) => {
            console.log("🚀 ~ file: form-store.ts ~ line 23 ~ .actions ~ error", error)
          })
        return () => clearForm()
      },
    }
  }) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface IFormStore extends Instance<typeof FormStoreModel> {}
export interface TFormStoreOut extends SnapshotOut<typeof FormStoreModel> {}
export interface TFormStoreIn extends SnapshotIn<typeof FormStoreModel> {}
export const createFormStoreDefaultModel = () =>
  types.optional(FormStoreModel, {
    form: undefined,
    currentPage: 0,
    error: undefined,
    isFormSubmitted: false,
    isRequestingForm: false,
  })
