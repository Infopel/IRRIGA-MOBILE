import { Api } from "./api"
import { getDistrictsByProvince as getFilterWithControlId } from "./api-params"
import { parseApiResponse } from "./api-problem"
import {
  GetFilterControlWithIdBody,
  GetFilterControlWithIdResult,
  FilterControlWithIdResult,
  GetRawFilterControlWithIdResult,
} from "./api.types"
import { parseGetRawFilterControlWithIdResult } from "./helper/filter-control-with-id"

export class QueryFilterApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  /**
   * Gets a single user by ID
   */

  async filterWithId(filterId:string,id: number): Promise<GetFilterControlWithIdResult> {
    // make the api call
    try {
      const response = (await this.api.apisauce.get<
        GetFilterControlWithIdBody,
        GetRawFilterControlWithIdResult
      >(getFilterWithControlId(filterId,id).url)) as any
      return parseApiResponse<GetRawFilterControlWithIdResult, FilterControlWithIdResult>(response)(
        parseGetRawFilterControlWithIdResult,
      )
    } catch (e) {
      return { kind: "bad-data" }
    }
  }
}
