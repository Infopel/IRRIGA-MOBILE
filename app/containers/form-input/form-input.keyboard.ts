import { isNil } from "lodash"
import { Validator } from "models"
import { KeyboardTypeOptions } from "react-native"
import { TextFormatter } from "utils"

export function getKeyboardType(val?: Validator["contentType"]): KeyboardTypeOptions {
  switch (val) {
    case "tel":
      return "phone-pad"
    case "money":
      return "decimal-pad"
    case "number":
      return "numeric"
    default:
      return "default"
  }
}

export function formatText(
  format?: Validator["contentType"],
  oldText?: string,
  newKey?: string,
): string | undefined {
  let text = ""
  let key = ""
  if (isNil(newKey)) {
    if (isNil(oldText)) {
      return
    }
  } else {
    key = newKey
  }
  if (isNil(oldText)) {
  } else {
    text = oldText
  }

  let formatted = ""
  switch (format) {
    case "tel":
      formatted = TextFormatter.formatToPhoneNumber(text, key)
      break
    case "money":
    case "number":
      formatted = TextFormatter.formatToNumeric(text, key)
      break
    case "paper-entity-code":
      formatted = TextFormatter.formatToPaperEntityCode(text, key)
      break
    case "duat":
      formatted = TextFormatter.formatToPaperEntityCode(text, key)
      break
    default:
      formatted = text + key
      break
  }
  return formatted
}
