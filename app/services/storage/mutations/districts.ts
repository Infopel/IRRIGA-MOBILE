import { database } from "storage/database"
import { District } from "storage/models/district"
import logger from "utils/logger"
export type IDistrict = {
  id: number
  name: string
}
export async function updateDistricts(districts: IDistrict[]) {
  logger.log({districts})
  const districtsCollection = database.collections.get<District>(District.table)
  return await database.write(async () => {
    return await database.batch(
      ...districts
        .filter(async ({id}) => {
          try {
            await districtsCollection.find(id.toString())
            return false
          } catch (error) {
            return true
          }
        })
        .map(({ id, name }) => {
          return districtsCollection.prepareCreate((record) => {
            record._raw.id = id + ""
            record.name = name
          })
        })
        .filter((v) => v !== undefined),
    )
  })
}
