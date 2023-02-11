import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { FieldOutputModel } from "models/field-output/field-output"
import { FieldModel } from "models/field/field"
import { FormModel } from "models/form/form"
/**
 * Model description here for TypeScript hints.
 */
export const SubformModel = types
  .model("Subform")
  .props({
    id: types.identifier,
    parentForm: types.reference(FormModel),
    formField: types.reference(FieldModel),
    labelField: types.reference(FieldModel),
    output: types.optional(types.array(FieldOutputModel), []),
  })

  .views((self) => ({
    get form() {
      return self.output[0].form
    },
    get labelFieldOutput() {
      return self.output.find((out) => out.input.id === self.labelField.id)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TSubform = Instance<typeof SubformModel>
export interface Subform extends TSubform {}
type TSubformSnapshot = SnapshotOut<typeof SubformModel>
export interface SubformSnapshot extends TSubformSnapshot {}
