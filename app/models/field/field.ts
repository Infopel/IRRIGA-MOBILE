import { QueryFilterApi } from "api/filter-control-with-id-api"
import {
  applySnapshot,
  flow,
  getParent,
  getParentOfType,
  getSnapshot,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree"
import { withEnvironment } from "models/extensions/with-environment"
import { withRootStore } from "models/extensions/with-root-store"
import { FormStoreModel, IFormStore } from "models/form-store/form-store"
import { FormModel, Form as IForm } from "models/form/form"
import { updateDistricts } from "storage/mutations/districts"
import { updateOptions } from "storage/mutations/options"
import logger from "utils/logger"
import { NumberStringified } from "../types"
import { OptionModel } from "./../option/option"
import { ValidatorModel } from "./../validator/validator"

/**
 * Model description here for TypeScript hints.
 */
export const FieldModel = types
  .model("Field")
  .props({
    id: types.union(types.identifier, NumberStringified),
    label: types.string,
    isLoadingRequest: false,
    type: types.enumeration("FieldType", [
      "text",
      "dropdown",
      "radio",
      "chip",
      "capture",
      "location",
      "date",
      "form",
    ]),
    labelField: types.maybeNull(types.number),
    isDisabled: false,
    dependOn: types.maybeNull(types.string),
    value: types.maybeNull(types.string),
    filterId: types.maybeNull(types.number),
    filterWithDropdown: types.maybeNull(
      types.enumeration("FilterWithDropdown", [
        "DISTRICT_BY_PROVINCE",
        "ASSOCIACAO_POR_REGADIO",
        "REGADIO_POR_ASSOCIACAO",
        "REGADIO_POR_PROVINCIA",
        "DISTRICT_BY_PROVINCE",
        "BENEFICIARIO_POR_REGADIO",
        "BENEFICIARIO_POR_ASSOCIACAO",
        "BENEFICIARIO_POR_ESCOLA",
        "OPCOES_POR_PERGUNTA",
      ]),
    ),
    options: types.maybeNull(types.array(OptionModel)),
    validators: types.maybeNull(ValidatorModel),
    placeholder: types.maybeNull(types.string),
  })
  .extend(withEnvironment)
  .extend(withRootStore)
  .extend((self) => {
    const form: IForm = getParent(self, 4)
    const filterWithField: string[] = []
    const dependOnChilds: { key: string; value: string }[] = []
    const formStore = getParentOfType(self, FormStoreModel) as IFormStore

    function setDisableAllDependents(disable: boolean) {
      for (const { key, value } of dependOnChilds) {
        const fieldOutput = formStore.getFieldOutput(key)
        const field = formStore.getField(key, form.id)
        if (field) {
          field.isDisabled = disable || !fieldOutput ? true : fieldOutput.value !== value
        }
      }
    }

    const notifyQueryField = (value: number, output: any) => {
      for (const { key, value } of dependOnChilds) {
        const fieldOutput = formStore.getFieldOutput(self.id)
        const field = formStore.getField(key, form.id)

        if (field) {
          field.isDisabled = !fieldOutput ? true : fieldOutput.value !== value
          if (field.isDisabled) field.toggleDisable(true)
        }
      }

      for (const fieldId of filterWithField) {
        const field = formStore.getField(fieldId, form.id)
        if (field) {
          field
            .queryOptions(value, output)
            .then((res) => {
              console.tron?.log?.("request successed", res)
            })
            .catch((error) => {
              console.tron?.error?.(error.message, error.stack)
            })
        }
      }
    }
    const queryOptions = flow(function* (value: number, output: any) {
      try {
        self.isLoadingRequest = true
        formStore.setFieldError(self.id, undefined)
        formStore.setFieldWarn(self.id, undefined)
        const api = new QueryFilterApi(self.environment.api)

        const response = yield api.filterWithId(self.filterWithDropdown as string, value)
        self.options?.clear()

        if (response.kind === "ok") {
          const result = response.result
          if (self.options) {
            for (const { id, name } of result.list) {
              self.options?.push({ id, name })
            }

            if (
              self.filterWithDropdown &&
              [
                "DISTRICT_BY_PROVINCE",
                "ASSOCIACAO_POR_REGADIO",
                "REGADIO_POR_ASSOCIACAO",
                "REGADIO_POR_PROVINCIA",
                "DISTRICT_BY_PROVINCE",
                "BENEFICIARIO_POR_REGADIO",
                "BENEFICIARIO_POR_ASSOCIACAO",
                "BENEFICIARIO_POR_ESCOLA",
                "OPCOES_POR_PERGUNTA",
              ].includes(self.filterWithDropdown)
            ) {
              yield updateOptions(result.list.map((o: any) => ({ ...o, fieldId: self.id })))
            }
          }
        } else {
          if (output) {
            if (response.kind === "not-found") {
              self.validators?.required
                ? formStore.setFieldError(
                    self.id,
                    "Não foi encontrado nenhum item para seleção, tente outro",
                  )
                : formStore.setFieldWarn(
                    self.id,
                    "Não foi encontrado nenhum item para seleção, tente outro",
                  )
              return
            }
            logger.log({ response })
            self.validators?.required
              ? formStore.setFieldError(self.id, "Não foi possível terminar a pesquisa")
              : formStore.setFieldWarn(self.id, "Não foi possível terminar a pesquisa")
          }
        }
      } catch (e) {
        console.error(e)
      } finally {
        self.isLoadingRequest = false
      }
    })
    const setfilterChildField = (fieldId: string) => {
      filterWithField.push(fieldId)
    }
    const setDependOnChild = (child: string, value: string) => {
      dependOnChilds.push({ key: child, value: value })
    }
    return {
      actions: {
        setfilterChildField,
        setDependOnChild,
        queryOptions,
        notifyQueryField,
        toggleDisable: setDisableAllDependents,
      },
    }
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    afterAttach() {
      const formStore = getParentOfType(self, FormStoreModel)
      const form: IForm = getParent(self, 4)

      if (self.filterId) {
        const field = formStore.getField(self.filterId + "", form.id)
        field?.setfilterChildField(self.id)
      }

      if (self.dependOn) {
        self.isDisabled = true
        const deps = self.dependOn.split("/")
        const field = formStore.getField(deps[0], form.id)
        field?.setDependOnChild(self.id, deps[1])
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

const FieldListModel = types.array(FieldModel)
type TFieldList = Instance<typeof FieldListModel>
export interface FieldList extends TFieldList {}

export interface Field extends Instance<typeof FieldModel> {}
export interface TField extends SnapshotOut<typeof FieldModel> {}
export interface TFieldSnapshotIn extends SnapshotIn<typeof FieldModel> {}
