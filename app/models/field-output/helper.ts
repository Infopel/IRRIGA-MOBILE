import { Field } from "models/field/field"
import { Validator } from "models/validator/validator"
import logger from "utils/logger"
import { validate, ValidationRule } from "utils/validate"

export function validateField(
  type: Field["type"],
  validatorPreset: Validator | null,
  value?: string | string[],
): string | undefined {
  let rule: ValidationRule = { type: "text" }
  rule.max = validatorPreset?.max ?? undefined
  rule.min = validatorPreset?.min ?? undefined

  let parsedValue: number | string | string[] | undefined = value

  switch (type) {
    case "dropdown":
      rule.type = "text"
      break;
    case "text":
      rule.type = "text"

      switch (validatorPreset?.contentType) {
        case "number":
          rule.type = "number"
          parsedValue = parseFloat(value as string)
          break
        case "money":
          rule.type = "positive-number"
          parsedValue = parseFloat(value as string)
          break
        case "month":
          rule.type = "month"
          parsedValue = parseFloat(value as string)
          rule.max = undefined
          rule.min = undefined
          break
        case "tel":
          rule.type = "tel"
          break
        case "paper-entity-code":
          rule.type = "paper-entity-code"
          break
      }
      break

    case "capture":
    case "location":
    case "chip":
      rule.type = "list"
      break
    case "date":
      if(value === 'NaN') return 'Data inválida'
      rule.type = "date"
      parsedValue = parseFloat(value as string)
      break
  }
  return validate(rule, parsedValue, validatorPreset?.required ?? false)
}
