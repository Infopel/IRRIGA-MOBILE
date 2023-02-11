import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NumberStringified } from "../types"

/**
 * Model description here for TypeScript hints.
 */
export const OptionModel = types
  .model("Option")
  .props({ id: NumberStringified, name: types.string })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TOption = Instance<typeof OptionModel>
export interface Option extends TOption {}
type TOptionSnapshot = SnapshotOut<typeof OptionModel>
export interface OptionSnapshot extends TOptionSnapshot {}
export const createOptionDefaultModel = () => types.maybe(OptionModel)
