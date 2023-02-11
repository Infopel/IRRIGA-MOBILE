import { isValid as isValidDate } from "date-fns"
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { Field, FieldModel } from "models/field/field"
import { FormModel } from "models/form/form"
import { TextUtils } from "utils"
import { validateField } from "./helper"
/**
 * Model description here for TypeScript hints.
 */
export const FieldOutputModel = types
  .model("FieldOutput")
  .props({
    input: types.reference(FieldModel),
    value: types.maybe(types.string),
    error: types.maybe(types.string),
    warn: types.maybe(types.string),
    multiValue: types.optional(types.array(types.string), []),
    form: types.reference(types.late(() => FormModel)),
  })
  .actions((self) => ({
    findInputOptions(value: string[] | string) {
      const field = self
      if (!field.input.options || field.input.options.length <= 0) {
        throw new Error("Field options list must not be empty")
      }
      if (Array.isArray(value)) {
        for (const v of value) {
          if (!field.input.options.find((i) => i.id === v)) {
            throw new Error(`Value with id ${v} does not exist on Options list`)
          }
        }
      } else {
        if (!field.input.options.find((i) => i.id === value)) {
          throw new Error(`Value with id ${value} does not exist on Options list`)
        }
      }
    },
  }))
  .actions((self) => ({
    set: (value?: string | string[]) => {
      const val = validateField(self.input.type, self.input.validators, value)
      self.error = val
     
      if (!value || value.length === 0) {
        self.value = undefined
        self.multiValue.clear()
        return
      }
      const multiValueTypes = ["capture", "chip"]
      const singleValueTypes: Field["type"][] = ["date", "text", "dropdown", "radio"]
      const fieldWithOptions: Field["type"][] = ["radio", "chip", "dropdown"]

      if (multiValueTypes.includes(self.input.type) && !Array.isArray(value)) {
        throw new Error(`Invalid ${value} for ${self.input.type} control`)
      }
      if (singleValueTypes.includes(self.input.type) && typeof value !== "string") {
        throw new Error(`Invalid ${value} for ${self.input.type} control`)
      }

      if (self.input.type === "location" && (!Array.isArray(value) || value.length !== 2)) {
        throw new Error(`Invalid ${value} for ${self.input.type} control`)
      }

      if (self.input.type === "date") {
        if (!Array.isArray(value)) {
          self.value = value
        } else {
          throw new Error(`input ${value} is not a valid number-date type`)
        }
      }

      if (fieldWithOptions.includes(self.input.type)) {
        self.findInputOptions(value)
      }

      if (Array.isArray(value)) {
        self.multiValue.clear()
        self.multiValue.push(...value)
      } else {
        self.value = value
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

type TFieldOutput = Instance<typeof FieldOutputModel>
export interface FieldOutput extends TFieldOutput {}
type TFieldOutputSnapshot = SnapshotOut<typeof FieldOutputModel>
export interface FieldOutputSnapshot extends TFieldOutputSnapshot {}
