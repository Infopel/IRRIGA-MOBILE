import { database } from "storage/database"
import { Commerce } from "storage/models/commerce"
export type CommerceInput = {
  price: number
  weight: number
  cultureId: string
  beneficiaryId: string
}
export async function addCommerce({ price, weight, beneficiaryId, cultureId }: CommerceInput) {
  return await database.write(async () => {
    return await database.collections.get<Commerce>(Commerce.table).create((record) => {
      record.price = price
      //@ts-ignore
      record.weight = weight
      //@ts-ignore
      record._raw.query_field_id = cultureId
      //@ts-ignore
      record._raw.beneficiary_id = beneficiaryId
      //@ts-ignore
    })
  })
}
