import { Q, Query } from "@nozbe/watermelondb"
import { FormApi, FormType } from "api"
import { TFieldSnapshotIn } from "models/field/field"
import { FieldsetSnapshot } from "models/fieldset/fieldset"
import { FormSnapshot } from "models/form/form"
import { database } from "storage/database"
import { FieldSet, Form, Option, Validation } from "storage/models"
import { Subform } from "storage/models/sub-form"
import logger from "utils/logger"

export async function getLocalFormFromType(type: FormType): Promise<FormSnapshot[]> {
  const id = FormApi.mapForm(type)
  const allFormIds = await listAllSubformIds([id], [id])

  const allForms = [] as FormSnapshot[]

  for (const formId of allFormIds) {
    allForms.push(await getForm(formId))
  }

  return allForms
}

async function listAllSubformIds(formIds: string[], allFormIds: string[] = []): Promise<string[]> {
  const collection = await database
    .get<Subform>(Subform.table)
    .query(Q.where("main_id", Q.oneOf(formIds)))
    .fetch()

  const list = collection.map((x) => x._raw.form_id)

  if (list.length === 0) return allFormIds

  allFormIds.push(...list)

  return await listAllSubformIds(list, allFormIds)
}

async function getForm(id: string): Promise<FormSnapshot> {
  const { name, fieldsets: f } = await getFormName(id)
  const fieldset = await getAllFieldSetContent(f)
  return { id, name, fieldset }
}

async function getFormName(id: string) {
  return database.get<Form>(Form.table).find(id)
}

async function getAllFieldSetContent(fieldset: Query<FieldSet>): Promise<FieldsetSnapshot[]> {
  const sets = (await fieldset.fetch()).sort((a, b) => a.index - b.index)
  const fieldsets: FieldsetSnapshot[] = []
  for (const set of sets) {
    const { id, index, label, description, fields: f } = set

    const controls = await getAllFieldsFromFieldset(set)
    fieldsets.push({
      id: parseInt(id),
      label,
      description,
      controls,
    })
  }

  return fieldsets
}

async function getAllFieldsFromFieldset(set: FieldSet): Promise<TFieldSnapshotIn[]> {
  const modelFields = await set.fields.fetch()
  const fields: TFieldSnapshotIn[] = []

  for (const field of modelFields) {
    const { id, label, placeholder, type, options: op, validations: v } = field
    let options: Option[] | null = null
    let validations: Validation | null = null

    try {
      options = await op.fetch()
    } catch (e) {
      logger.error(e)
    }
    try {
      const v1 = await v.fetch()
      validations = v1[0] ?? null
    } catch (e) {
      logger.error(e)
    }

    fields.push({
      id,
      label,
      placeholder,
      type,
      options: options?.map(({ id, name }) => ({ id, name })),
      validators: !validations
        ? null
        : {
            contentType: validations.contentType,
            required: validations.required,
            max: validations.max,
            min: validations.min,
          },
    })
  }
  return fields
}
