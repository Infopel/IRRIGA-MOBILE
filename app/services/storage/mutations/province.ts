import { database } from "storage/database"
import { Province } from "storage/models/province"
import logger from "utils/logger"

export type IProvince = {
    id: number
    name: string
  }
  export async function updateDistricts(districts: IProvince[]) {
    logger.log({districts})
    const provincesCollection = database.collections.get<Province>(Province.table)
    return await database.write(async () => {
      return await database.batch(
        ...districts
          .filter(async ({id}) => {
            try {
              await provincesCollection.find(id.toString())
              return false
            } catch (error) {
              return true
            }
          })
          .map(({ id, name }) => {
            return provincesCollection.prepareCreate((record) => {
              record._raw.id = id + ""
              record.name = name
            })
          })
          .filter((v) => v !== undefined),
      )
    })
  }
  