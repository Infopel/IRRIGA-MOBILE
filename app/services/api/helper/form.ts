import { FormResult, RawFormResult } from "../api.types"
import { unionWith } from "lodash"

export function parseFormResult(formId: string) {
  return function _parseFormResult(input: RawFormResult): FormResult {
    const form = unionWith(input.form, (a, b) => a.id === b.id)
    const indexOf = form.findIndex(
      (form) => form.id === formId,
    )
    if (indexOf < 0) throw new Error("Could not find main form")
    const mainForm = form[indexOf]
    form.splice(indexOf, 1)

    return { main: mainForm, others: form }
  }
}
