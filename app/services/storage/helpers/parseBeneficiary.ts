import { Response } from "storage/models/response"
import { beneficiariesFields } from "storage/queries/constants"
import { TextUtils } from "utils/TextUtils"
import { IBeneficiary, IBeneficiaryItem, IResponse } from "../queries/types"
import { parseAddress } from "./parseAddress"
import { putValueIfNotEmpty } from "./parseValue"
export function parseBeneficiaryFromResponses(responses: IResponse[]): IBeneficiaryItem {
  let id = responses[0].quizId
  let name: string = ""
  for (const field of responses) {
    if (field.response === undefined) continue
    if (field.fieldId === beneficiariesFields.FIRST_NAME) {
      name = TextUtils.appendName(field.response, name)
    }
    if (field.fieldId === beneficiariesFields.LAST_NAME) {
      name = TextUtils.appendName(name, field.response)
    }
  }
  return { name, id }
}
export function parseBeneficiaryDetailsFromResponses(responses: IResponse[]): IBeneficiary {
  let id = responses[0].quizId
  let name: string = ""

  let beneficiary = { association: "", waterSupply: "" } as Omit<IBeneficiary, "name" | "id">
  let obj: { [x: string]: string | undefined } = {}
  for (const field of responses) {
    if (field.response === undefined) continue
    if (field.fieldId === beneficiariesFields.FIRST_NAME) {
      name = TextUtils.appendName(field.response, name)
    }
    if (field.fieldId === beneficiariesFields.LAST_NAME) {
      name = TextUtils.appendName(name, field.response)
    }
    putValueIfNotEmpty(beneficiary, field, "association", beneficiariesFields.ASSOCIATION)
    putValueIfNotEmpty(beneficiary, field, "waterSupply", beneficiariesFields.WATER_SUPPLY)
    let o = parseAddress(obj, field)
    beneficiary.address = o.stringified
    obj = o.obj
  }
  return { name, id, ...beneficiary }
}
