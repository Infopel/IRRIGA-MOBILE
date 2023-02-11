import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { createCommerceStoreDefaultModel } from "models/commerce-store/commerce-store"
import { createFormStoreDefaultModel } from "../form-store/form-store"
import { createUserStoreDefaultModel } from "./../user-store/user-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  userStore: createUserStoreDefaultModel(),
  formStore: createFormStoreDefaultModel(),
  commerceStore: createCommerceStoreDefaultModel(),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
