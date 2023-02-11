import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const CultureModel = types
  .model("Culture")
  .props({ name: types.string, id: types.identifier })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TCulture = Instance<typeof CultureModel>
export interface Culture extends TCulture {}
type TCultureSnapshot = SnapshotOut<typeof CultureModel>
export interface CultureSnapshot extends TCultureSnapshot {}
export const createCultureDefaultModel = () => types.maybe(CultureModel)
