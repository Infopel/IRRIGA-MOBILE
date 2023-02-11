import { Database, Model, Q } from "@nozbe/watermelondb"
import { differenceWith, isNil } from "lodash"
import { Subform } from "storage/models/sub-form"
import logger from "utils/logger"
import { database } from ".."
import { Field } from "../models/field"
import { FieldSet } from "../models/field-set"
import { Form } from "../models/form"
import { Option } from "../models/option"
import { Validation } from "../models/validation"
import { createOptionsBatch, IOption, purgeUnusedFieldOptions } from "./options"

type TForm = { id: string; fieldset: TFieldSet[]; name: string }
type TFieldSet = {
  id: number
  label: string
  description: string
  controls: TField[]
  dependOn?: string
}
type IRecordId = string | number
type TValidation = {
  required: boolean
  min: number
  max: number
  contentType: Validation['contentType']
}
type TField = {
  id: string | number
  label: string
  value?: string | null
  type: Field["type"]
  placeholder: string | null
  options: IOption[] | null
  validators?: TValidation
  dependOn?: string
  filterId?: string
}

export async function addOrUpdateForm(database: Database, forms: TForm[]): Promise<void> {
  const operations: Model[] = []

  for await (const form of forms) {
    operations.push(
      ...(await purgeUnusedFieldSets(
        database,
        form.id,
        form.fieldset.map((x) => x.id),
      )),
    )
    for (let i = 0; i < form.fieldset.length; i++) {
      const fieldset = form.fieldset[i]
      const fieldsetOp = await createFieldSet(database, fieldset, i, form.id)
      operations.push(
        ...(await purgeUnusedField(
          database,
          fieldset.id,
          fieldset.controls.map((x) => x.id),
        )),
      )
      fieldsetOp && operations.push(fieldsetOp)
      for (let j = 0; j < fieldset.controls.length; j++) {
        const field = fieldset.controls[j]
        operations.push(...(await purgeUnusedFieldRemains(database, { id: field.id })))
        const fieldsOp = await createField(database, field, j, fieldset.id + "")
        fieldsOp && operations.push(...fieldsOp)
        if (field.options && field.options.length > 0) {
          operations.push(
            ...(await createOptionsBatch(
              field.options.map((x) => ({ ...x, fieldId: field.id + "" })),
            )),
          )
        }

        if (field.value) {
          const subformOp = await createSubform(form.id, field.value)
          if (subformOp.length > 0) {
            operations.push(...subformOp)
          }
        }

        if (field.validators) {
          const op = await createFieldValidation(database, field.validators, field.id + "")
          op && operations.push(op)
        }
      }
    }
    const formOp = await createForm(database, form)
    if (formOp) operations.push(formOp)
  }
  const acceptedOp = operations.filter((x)=>!isNil(x._raw) ).sort((a, b) => a._raw.id.localeCompare(b._raw.id))

  await database.write(async () => {
    return await database.batch(...acceptedOp)
  })
}

async function createForm(database: Database, { id, name }: TForm) {
  const self = database.get<Form>(Form.table)

  try {
    const form = await self.find(id)

    //@ts-ignore
    if (form && form.__changes === null) {
      return form.prepareUpdate((record) => {
        record.name = name
      })
    }
    logger.log("form has pending changes")
    return undefined
  } catch (error) {
    logger.error(error)
    try {
      return await self.prepareCreate((record) => {
        record._raw.id = id
        record.name = name
      })
    } catch (error) {
      logger.error(error)
    }
  }
}
async function createFieldSet(
  database: Database,
  { description, id, label, dependOn }: TFieldSet,
  index: number,
  formId: string,
): Promise<Model | void> {
  const self = database.get<FieldSet>(FieldSet.table)

  try {
    const fieldset = await self.find(id + "")
    if (!fieldset) {
      logger.log("fieldset has pending changes")
      return undefined
    }
    return fieldset.prepareUpdate((record) => {
      record.label = label
      record.description = description
      record._raw.form_id = formId
      record._raw.index = index
      record._raw.depend_on = dependOn
    })
  } catch (e) {
    return self.prepareCreate((record) => {
      record._raw.id = id + ""
      record._raw.index = index
      record._raw.depend_on = dependOn
      record._raw.form_id = formId
      record.label = label
      record.description = description
    })
  }
}

async function createField(
  database: Database,
  { label, id, type, placeholder }: TField,
  index: number,
  fieldsetId: string,
): Promise<Model[]> {
  const self = database.get<Field>(Field.table)

  const list = [] as Model[]
  try {
    const field = await self.find(id + "")
    if (!field) {
      logger.log("field has pending changes")
      return []
    }

    //Deleting SUBFORM when is not used anymore
    if (field.type === "form" && field.type !== type) {
      list.push(
        ...(
          await database
            .get<Subform>(Subform.table)
            .query(Q.where("main_form_field_id", id + ""))
            .fetch()
        ).map((x) => x.prepareDestroyPermanently()),
      )
    }

    list.push(
      field.prepareUpdate((record) => {
        record.label = label
        record.type = type
        record.placeholder = placeholder ?? undefined
        record._raw.fieldset_id = fieldsetId
        record._raw.index = index
      }),
    )

    return list
  } catch (e) {
    return [
      self.prepareCreate((record) => {
        record._raw.id = id + ""
        record._raw.fieldset_id = fieldsetId
        record._raw.index = index
        record.label = label
        record.type = type
        record.placeholder = placeholder ?? undefined
      }),
    ]
  }
}

async function createFieldValidation(
  database: Database,
  { contentType, max, min, required }: TValidation,
  fieldId: string,
): Promise<Model | void> {
  const self = database.get<Validation>(Validation.table)

  try {
    const validation = await self.find(fieldId + "")
    if (!validation) {
      logger.log("Validation has pending changes")
      return undefined
    }
    return validation.prepareUpdate((record) => {
      record._raw.id = fieldId
      record._raw.field_id = fieldId
      record.max = max
      record.min = min
      record.required = required
      record.contentType = contentType
    })
  } catch (e) {
    return self.prepareCreate((record) => {
      record._raw.field_id = fieldId
      record.max = max
      record.min = min
      record.required = required
      record.contentType = contentType
    })
  }
}
async function createSubform(mainFormId: string, subformId: string): Promise<Model[]> {
  const subformCollection = database.get<Subform>(Subform.table)
  const subforms = await subformCollection
    .query(Q.where("main_id", mainFormId), Q.where("form_id", subformId))
    .fetch()

  if (subforms.length > 0) {
    return []
  }

  return [
    subformCollection.prepareCreate((rec) => {
      rec._raw.main_id = mainFormId
      rec._raw.form_id = subformId
    }),
  ]
}
async function purgeUnusedField(
  database: Database,
  fieldSetId: number | string,
  fieldIds?: IRecordId[],
): Promise<(Option | Validation | Field)[]> {
  const fieldsQuery =
    fieldIds && fieldIds.length > 0
      ? [Q.where("fieldset_id", fieldSetId + ""), Q.where("id", Q.oneOf(fieldIds))]
      : [Q.where("fieldset_id", fieldSetId + "")]

  const fields = await database
    .get<Field>(Field.table)
    .query(...fieldsQuery)
    .fetch()
    .then((field) =>
      field.map((x) => {
        try {
          return x.prepareDestroyPermanently()
        } catch (e) {
          //@ts-ignore
          logger.error({ fieldSetId, fieldIds, field: x, e: e.message })
          throw e
        }
      }),
    )

  const fieldRemains = (
    await Promise.all(
      fields.flatMap(async (x) => await purgeUnusedFieldRemains(database, { id: x.id })),
    )
  ).flatMap((x) => x)

  return [...fields, ...fieldRemains]
}

async function purgeUnusedFieldSets(
  database: Database,
  formId: string,
  fieldSetIds: (string | number)[],
): Promise<Model[]> {
  const exitstentFieldSets = await database
    .get<FieldSet>(FieldSet.table)
    .query(Q.where("form_id", formId))
    .fetch()

  const fieldSetsToRemove = differenceWith(
    exitstentFieldSets,
    fieldSetIds,
    (a, b) => a.id === b + "",
  ).map((x) => {
    try {
      return x.prepareDestroyPermanently()
    } catch (e) {
      //@ts-ignore
      logger.error({ formId, fieldSet: x, e: e.message })
      throw e
    }
  })

  const unusedFields = (
    await Promise.all(
      fieldSetsToRemove.flatMap(async (x) => await purgeUnusedField(database, x.id)),
    )
  ).flatMap((x) => x)

  return [...fieldSetsToRemove, ...unusedFields]
}

async function purgeUnusedFieldRemains(
  database: Database,
  field: { id: IRecordId; options?: IOption[]; validators?: TValidation },
): Promise<(Option | Validation)[]> {
  const list = [] as (Option | Validation)[]

  list.push(
    ...(await purgeUnusedFieldOptions(
      database,
      field.id,
      field.options?.map((x) => x.id),
    )),
  )
  if (!field.validators) {
    list.push(...(await purgeUnusedFieldValidations(database, field.id + "")))
  }

  return list
}

function purgeUnusedFieldValidations(
  database: Database,
  fieldId: string | number,
): Promise<Validation[]> {
  return database
    .get<Validation>(Validation.table)
    .query(Q.where("field_id", fieldId + ""))
    .fetch()
    .then((val) =>
      val.map((x) => {
        try {
          return x.prepareDestroyPermanently()
        } catch (e) {
          //@ts-ignore
          logger.error({ fieldId, validation: x, e: e.message })
          throw e
        }
      }),
    )
}
