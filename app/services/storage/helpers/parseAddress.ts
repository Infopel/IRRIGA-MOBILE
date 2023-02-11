import { IResponse } from "storage"
import { beneficiariesFields as fields } from "storage/queries/constants"
import { putValueIfNotEmpty } from "./parseValue"
type Obj = { [x: string]: string | undefined }

export function parseAddress(obj: Obj, response: IResponse) {
  putValueIfNotEmpty(obj, response, "province", fields.PROVINCE)
  if(!obj.province) obj.province = undefined
  putValueIfNotEmpty(obj, response, "district", fields.DISTRICT)
  if(!obj.district) obj.district = undefined
  putValueIfNotEmpty(obj, response, "admin_post", fields.ADMIN_POST)
  if(!obj.admin_post) obj.admin_post = undefined
  putValueIfNotEmpty(obj, response, "locality", fields.LOCALITY)
  if(!obj.locality) obj.locality = undefined

  let result = ""

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const resp = obj[key]
      if (resp) result = result ? result + ", " + resp : resp
    }
  }

  return { obj, stringified: result }
}
