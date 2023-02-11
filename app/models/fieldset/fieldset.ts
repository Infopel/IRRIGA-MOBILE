import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FieldModel } from "models/field/field"

/**
 * Model description here for TypeScript hints.
 */
export const FieldsetModel = types
  .model("Fieldset")
  .props({
    id: types.identifierNumber,
    label: types.string,
    dependOn: types.maybeNull(types.array(types.string)),
    description: types.string,
    controls: types.array(FieldModel),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TFieldset = Instance<typeof FieldsetModel>
export interface Fieldset extends TFieldset {}
type TFieldsetSnapshot = SnapshotOut<typeof FieldsetModel>
export interface FieldsetSnapshot extends TFieldsetSnapshot {}
