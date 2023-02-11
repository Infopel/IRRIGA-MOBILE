import { Api } from "./api"
import { getForm } from "./api-params"
import { parseApiResponse } from "./api-problem"
import { FormResult, GetFormBody, GetFormResult, RawFormResult } from "./api.types"
import { parseFormResult } from "./helper/form"
export const forms = {
  beneficiary: "abf1cb25-5ed6-47c2-9219-d414c373663b",
  farm_school_monitoring: "64e03d11-77ee-48a1-a7c8-c9e44e15c48b",
  water_supply: "ecce9f56-ff36-4f6a-a9fa-717b17339a32",
  agro_commerce_monitoring: "df11e906-9c1e-4775-bcd4-f8c364d39e6c",
  agro_income_monitoring: "84b3be58-1c13-4ea0-acbf-d241039854b3",
  water_supply_contruction_monitoring: "6daf4ee4-abf2-4ff5-8949-39cfbec4a1ed",
  formation: "c1a69dd8-ee27-4f23-a6a3-27597b10f37c",
  farm_school_register: "0fda242a-9c5d-4c07-bb82-0cbfda810646",
  water_supply_constuction_fiscalization: "9db8e1d2-5609-4466-9206-df4f39d3b727",
  satisfaction_evaluation: "a2c36e37-39af-453b-8b91-123d23fb780c",
  farm_tools_distribuition: "80d03209-49dc-4ba7-ba33-2b6e6668bb2e",
  water_supply_intensification: "a81ca87b-325f-48aa-9a17-aea7598e23ed",
  social_safe_guard_monitoring: "f9b1d501-23ff-4dd7-b33f-340a7a11c558",
  enviromental_safe_guard_monitoring: "7c04b0da-fd60-4036-a526-a8c15ec83e8d",
  register_adenda_and_contingencies: "334b346b-f900-440e-83f3-f4da73548a6b",
}
export type FormType = keyof typeof forms
export class FormApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  public static mapForm(type: FormType) {
    return forms[type]
  }

  /**
   * Gets a single user by ID
   */

  async getForm(id: string): Promise<GetFormResult> {
    // make the api call
    try {
      const response = await this.api.apisauce.get<GetFormBody, GetFormResult>(
        getForm().url,
        {
          FormId: id,
          IdUser: "d64c97cd-6e3c-4d18-8475-7a442cf309fe",
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      return parseApiResponse<RawFormResult, FormResult>(response)(parseFormResult(id))
    } catch (e) {
      console.log(e)
      return { kind: "bad-data" }
    }
  }
}
