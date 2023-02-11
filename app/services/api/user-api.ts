import { ApiResponse, CancelToken } from "apisauce"
import { Api } from "./api"
import { parseApiResponse } from "./api-problem"
import {
  AuthResult,
  GetAuthResult,
  GetUserResult,
  RawGetAuthResult,
  RawGetUserResult,
  User,
} from "./api.types"
import { parseGetUser, parseSignIn } from "./helper/user"

const API_PAGE_SIZE = 50

export class UserApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  /**
   * Gets a single user by ID
   */

  async signIn(email: string, password: string): Promise<GetAuthResult> {
    try {
      // make the api call
      const source = CancelToken.source()

      const response: ApiResponse<RawGetAuthResult> = await this.api.apisauce.post(
        "/login",
        {
          username: email,
          password,
        },
        { cancelToken: source.token },
      )

      return parseApiResponse<RawGetAuthResult, AuthResult>(response)(parseSignIn)
    } catch (e) {
      //@ts-ignore
      console.tron?.error?.(e.message, e.stack)

      return { kind: "bad-data" }
    }
  }
}
