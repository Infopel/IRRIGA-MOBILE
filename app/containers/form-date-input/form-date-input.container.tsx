import { DateInput } from "components/date-input/date-input.component"
import { observer } from "mobx-react-lite"
import { useStores } from "models/root-store/root-store-context"
import * as React from "react"
import logger from "utils/logger"
import { FormInput } from "../FormInput.types"

export interface FormDateInputProps extends FormInput {
  isInvalid?: boolean
}

/**
 * Describe your component here
 */
export const FormDateInputContainer = observer(function FormDateInput(props: FormDateInputProps) {
  const { id, formId, isInvalid } = props

  logger.log("FormDateInputContainer", { id, isInvalid })

  const {
    formStore: { getField, updateField, getFieldOutput, setFieldError },
  } = useStores()

  const field = getField(id, formId)
  const fieldOutput = getFieldOutput(id)

  if (!field) return null

  const handleOnDateChange = (date: number | null) => {
    logger.log("FormDateInputContainer => handleOnDateChange", { date })
    updateField(props.id, date + "")
  }

  const value = fieldOutput?.value ? parseInt(fieldOutput.value) : undefined
  logger.log("FormDateInputContainer => ", { value })
  return (
    <DateInput
      isInvalid={isInvalid}
      label={props.label}
      min={field.validators?.min ?? undefined}
      max={field.validators?.max ?? undefined}
      date={value}
      onChangeDate={handleOnDateChange}
    />
  )
})
