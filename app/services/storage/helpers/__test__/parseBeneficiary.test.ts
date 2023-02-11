import { parseBeneficiaryDetailsFromResponses, parseBeneficiaryFromResponses } from "../parseBeneficiary"
import { IBeneficiary, IBeneficiaryItem } from "storage/queries"
import { Response } from "storage/models/response"
import { beneficiariesFields as fields } from "storage/queries/constants"

describe("Parse Beneficiary", () => {
  it("should parse beneficiary details from responses", () => {
    const addressStringifyied = `Maputo, KaMavota, Posto Xidambele, Localidade de Matleba`
    const result: IBeneficiary = {
      id: "20",
      address: addressStringifyied,
      association: "Associacao Mandela",
      name: "Apollo Creed",
      waterSupply: "Regadio Samora",
    }
    const responses = [
      { fieldId: fields.PROVINCE, response: "Maputo", quizId: "20" } as Response,
      { fieldId: fields.DISTRICT, response: "KaMavota", quizId: "20" } as Response,
      { fieldId: fields.ADMIN_POST, response: "Posto Xidambele", quizId: "20" } as Response,
      { fieldId: fields.LOCALITY, response: "Localidade de Matleba", quizId: "20" } as Response,
      { fieldId: fields.FIRST_NAME, response: "Apollo", quizId: "20" } as Response,
      { fieldId: fields.LAST_NAME, response: "Creed", quizId: "20" } as Response,
      { fieldId: fields.ASSOCIATION, response: result.association, quizId: "20" } as Response,
      { fieldId: fields.WATER_SUPPLY, response: result.waterSupply, quizId: "20" } as Response,
    ]
    expect(parseBeneficiaryDetailsFromResponses(responses)).toEqual(result)
  })
  it("should parse beneficiary from responses", () => {
    const result: IBeneficiaryItem = {
      id: "20",
      name: "Apollo Creed",
    }
    const responses = [
      { fieldId: fields.PROVINCE, response: "Maputo", quizId: "20" } as Response,
      { fieldId: fields.DISTRICT, response: "KaMavota", quizId: "20" } as Response,
      { fieldId: fields.ADMIN_POST, response: "Posto Xidambele", quizId: "20" } as Response,
      { fieldId: fields.LOCALITY, response: "Localidade de Matleba", quizId: "20" } as Response,
      { fieldId: fields.FIRST_NAME, response: "Apollo", quizId: "20" } as Response,
      { fieldId: fields.LAST_NAME, response: "Creed", quizId: "20" } as Response,
    ]
    expect(parseBeneficiaryFromResponses(responses)).toEqual(result)
  })
})
