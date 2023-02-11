import { translate } from "../../i18n/translate"
import loginJson from "api/mock/queries/.responses/login.json"
import { parseSignIn } from "api/helper/user"
import { applySnapshot, flow, Instance, SnapshotOut, types } from "mobx-state-tree"
import { GetAuthResult, GetUserResult } from "../../services/api"
import { GeneralApiProblem } from "../../services/api/api-problem"
import { UserApi } from "../../services/api/user-api"
import { TUserSnapshot, UserModel } from "../user/user"
import { withEnvironment } from "./../extensions/with-environment"
import { storeUser } from "./user-store.helpers"

/**
 * Model description here for TypeScript hints.
 */

export const SignInStatus = types.enumeration("SignedStatus", [
  "signedIn",
  "signedOut",
  "signingIn",
])

export const UserStoreModel = types
  .model("UserStore")
  .extend(withEnvironment)
  .props({
    user: types.maybe(UserModel),
    status: types.optional(SignInStatus, "signedOut"),
    error: types.maybe(types.string),
  })
  .actions((self) => ({
    updateUserStatus: (user?: TUserSnapshot, error?: GeneralApiProblem["kind"] | "ok") => {
      switch (error) {
        case "ok":
          self.user = user
          self.status = "signedIn"
          break

        case "not-found":
          self.error = "O email ou password esta incorreto!"

        default:
          if (!self.error) self.error = "Nao foi possível autenticar a conta"
          self.user = undefined
          self.status = "signedOut"
          break
      }
    },
  }))
  .actions((self) => ({
    signIn: flow(function* (username: string, password: string) {
      try {
        self.status = "signingIn"
        self.error = undefined

        const defPass = "irriga@2022"
        const defUsers = ["ben@irriga.com", "reg@irriga.com"]
        if (
          password.trim() !== defPass ||
          !defUsers.includes(username.trim().toLocaleLowerCase())
        ) {
          self.updateUserStatus(undefined, "not-found")
          return
        }
        if (username.toLocaleLowerCase().trim() === defUsers[0]) {
          loginJson.user[0].username = username
          loginJson.user[0].role = "beneficiary"
          //@ts-ignore
          const result = parseSignIn(loginJson)
          self.updateUserStatus(
            { email: result.username, role: result.role, name: result.username },
            "ok",
          )
          return
        } else if (username.toLocaleLowerCase().trim() === defUsers[1]) {
          loginJson.user[0].username = username
          loginJson.user[0].role = "regadio"
          //@ts-ignore
          const result = parseSignIn(loginJson)
          self.updateUserStatus(
            { email: result.username, role: result.role, name: result.username },
            "ok",
          )
          return
        }
        self.updateUserStatus(undefined, "unknown")
        return
      //}

        // const api = new UserApi(self.environment.api)
        // const auth: GetAuthResult = yield api.signIn(username, password)

        // if (auth.kind === "not-found") {
        //   self.updateUserStatus(undefined, auth.kind)
        //   return
        // }
        // if (auth.kind === "ok") {
        //   self.updateUserStatus(
        //     {
        //       name: auth.result.username, //TODO change to name
        //       email: auth.result.username,
        //       role: auth.result.role,
        //     },
        //     auth.kind,
        //   )
        //   yield storeUser({
        //     name: auth.result.username, //TODO change to name
        //     email: auth.result.username,
        //     role: auth.result.role,
        //   })
        // } else self.updateUserStatus(undefined, auth.kind)
      } catch (e) {
        console.tron.reportError(e)
        self.updateUserStatus(undefined, "unknown")
      }
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
export const createUserStoreDefaultModel = () => types.optional(UserStoreModel, {})
