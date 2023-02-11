import { IBeneficiary } from "storage/queries"
import { beneficiariesFields as fields } from "storage/queries/constants"
import { parseAddress } from "../parseAddress"
import { Response } from "storage/models/response"

describe("parseAddress", () => {
  it("should parse address with all fields", () => {
    const addressStringifyied = `Maputo, KaMavota, Posto Xidambele, Localidade de Matleba`
    const responses = [
      { fieldId: fields.PROVINCE, response: "Maputo" },
      { fieldId: fields.DISTRICT, response: "KaMavota" },
      { fieldId: fields.ADMIN_POST, response: "Posto Xidambele" },
      { fieldId: fields.LOCALITY, response: "Localidade de Matleba" },
      { fieldId: fields.WATER_SUPPLY, response: "Regadio Samora" },
      { fieldId: fields.ASSOCIATION, response: "Associacao Samora" },
    ] as Response[]

    const expected: Omit<IBeneficiary, "address"> = {
      name: "Bela",
      association: "Matola",
      id: "sss",
      waterSupply: "ddddd",
    }
    const result: IBeneficiary = {
      ...expected,
      address: addressStringifyied,
    }

    let obj: { [x: string]: string | undefined } = {}

    for (const resp of responses) {
      let o = parseAddress(obj, resp)
      //@ts-ignore
      expected.address = o.stringified
      obj = o.obj
    }
    expect(expected).toEqual(result)
  })
})
