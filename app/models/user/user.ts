import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const UserModel = types
  .model("User")
  .props({
    name: types.string,
    email: types.string,
    role: types.union(types.literal("beneficiary"), types.literal("regadio")),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TUser = Instance<typeof UserModel>
export interface User extends TUser {}
export type TUserSnapshot = SnapshotOut<typeof UserModel>
export interface UserSnapshot extends TUserSnapshot {}
export const createUserDefaultModel = () => types.maybe(UserModel)
