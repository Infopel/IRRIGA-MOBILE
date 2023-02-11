import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ValidatorModel = types
  .model("Validator")
  .props({
    required: types.boolean,
    min: types.maybeNull(types.number),
    max: types.maybeNull(types.number),
    contentType: types.maybeNull(
      types.enumeration("Content Type", [
        "tel",
        "date",
        "textarea",
        "month",
        "time",
        "null",
        "number",
        "duat",
        "money",
        "image/*",
        "paper-entity-code",
      ]),
    ),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TValidator = Instance<typeof ValidatorModel>
export interface Validator extends TValidator {}
type TValidatorSnapshot = SnapshotOut<typeof ValidatorModel>
export interface ValidatorSnapshot extends TValidatorSnapshot {}
export const createValidatorDefaultModel = () => types.optional(ValidatorModel, { required: false })
