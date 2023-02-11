import { Instance } from "mobx-state-tree"
import { SubformModel } from "models"
import { Field } from "models/field/field"
export type SubformOutput = { id: string; name: string }

export function parseAllSubformsOutput(
  fieldOutputs: IterableIterator<Instance<typeof SubformModel>>,
  fieldId: string,
  formId: string,
): SubformOutput[] {
  const list = [] as SubformOutput[]

  for (const { id, output, labelField, formField } of fieldOutputs) {
    if (formField.id !== fieldId) continue;
      if (output.length > 0 && output[0].form.id === formId) {
        const field = output.find((out) => out.input.id === labelField.id)
        if (!field) continue
        const labelFieldValue = field.value
        switch (field.input.type) {
          case "text":
          case "date":
            list.push({ id, name: labelFieldValue ?? "" })
            break
          case "dropdown":
          case "radio":
            list.push({
              id,
              name: findOptionName(field.input, labelFieldValue) ?? "",
            })
            break
          case "chip":
          case "location":
            list.push({
              id,
              name: field.multiValue.reduce<string>((acc, value, index) => {
                return acc.length > 0
                  ? acc + ", " + stringOrOption(field.input, value)
                  : stringOrOption(field.input, value) ?? ""
              }, ""),
            })
            break

          default:
            break
        }
      }
  }
  return list
}
const findOptionName = (field: Field, id?: string) => {
  if (!id) return ""
  return field.options?.find((option) => option.id === id)?.name
}

const stringOrOption = (field: Field, value: string) => {
  return field.type === "chip" ? findOptionName(field, value) : value
}
