import { Database, Q } from "@nozbe/watermelondb"
import { database } from "storage/database"
import { Option } from "storage/models/option"
import logger from "utils/logger"
import { differenceWith } from "lodash"
export type IOption = {
  fieldId: string
  id: number
  name: string
}
export async function updateOptions(options: IOption[]) {
  console.log({ options })
  return await database.write(async () => {
    return await database.batch(...(await createOptionsBatch(options)))
  })
}

export async function createOptionsBatch(options: IOption[]): Promise<Option[]> {
  const list = [] as Option[]
  const OptionsCollection = database.collections.get<Option>(Option.table)
  for await (const { id, fieldId, name } of options) {
    try {
      const _options = await OptionsCollection.query(
        Q.and(Q.where("field_id", fieldId + ""), Q.where("code", id + "")),
      ).fetch()

      if (!_options[0]) {
        list.push(
          OptionsCollection.prepareCreate((record) => {
            record._raw.code = id + ""
            record._raw.field_id = fieldId + ""
            record.name = name
          }),
        )
      } else {
        list.push(_options[0].prepareUpdate((rec) => (rec.name = name)))
      }
    } catch (error) {
      //@ts-ignore
      logger.error({ option: { id, fieldId, name }, e: error.message })
      logger.error(error)
    }
  }

  return list
}

export async function purgeUnusedFieldOptions(
  database: Database,
  fieldId: string | number,
  options: number[] = [],
): Promise<Option[]> {
  const OptionsCollection = database.collections.get<Option>(Option.table)
  const existent = await OptionsCollection.query(Q.where("field_id", fieldId + "")).fetch()

  const toRemove = differenceWith(existent, options, (a, b) => a._raw.code === b + "")

  return toRemove.map((x) => {
    try {
      return x.prepareDestroyPermanently()
    } catch (e) {
      //@ts-ignore
      logger.error({ fieldId, option: x, e: e.message })
      throw e
    }
  })
}
