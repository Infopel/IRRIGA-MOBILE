import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CommerceModel = types
  .model("Commerce")
  .props({})
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TCommerce = Instance<typeof CommerceModel>
export interface Commerce extends TCommerce {}
type TCommerceSnapshot = SnapshotOut<typeof CommerceModel>
export interface CommerceSnapshot extends TCommerceSnapshot {}
export const createCommerceDefaultModel = () => types.optional(CommerceModel, {})
