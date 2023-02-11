import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Field } from "models/field/field"
import { FieldsetModel } from "models/fieldset/fieldset"

/**
 * Model description here for TypeScript hints.
 */
export const FormModel = types
  .model("Form")
  .props({
    id: types.identifier,
    name: types.string,
    fieldset: types.array(FieldsetModel),
  })
  .views((self) => ({
    get fields() {
      return self.fieldset.reduce((acc, fields) => [...acc, ...fields.controls], [] as Field[])
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TForm = Instance<typeof FormModel>
export interface Form extends TForm {}
type TFormSnapshot = SnapshotOut<typeof FormModel>
export interface FormSnapshot extends TFormSnapshot {}
