import * as Progress from "react-native-progress"

import { FormCaptureContainer } from "containers/form-capture"
import { FormMultiSelectContainer } from "containers/form-multi-select"
import { FormCoordinatesInputContainer } from "containers/form-coordinates-input"
import { FormDateInputContainer } from "containers/form-date-input"
import { FormInputContainer } from "containers/form-input"
import { FormRadioContainer } from "containers/form-radio"
import { FormSelectorContainer } from "containers/form-selector"
import { Box, FormControl, Stack, useTheme } from "native-base"
import * as React from "react"

import { SubformContainer } from "containers/subform"
import { isNil } from "lodash"
import { TFieldSnapshotIn } from "models"
import logger from "utils/logger"

export interface FormFieldProps {
  isRequired: boolean
  error?: string
  warn?: string
  formId?: string
  id: string
  isLoadingRequest: boolean
  placeholder?: string
  label: string
  type: TFieldSnapshotIn["type"]
}
export const FormField: React.FunctionComponent<FormFieldProps> = ({
  id,
  type,
  placeholder,
  isLoadingRequest,
  isRequired,
  error,
  warn,
  label,
  formId,
}) => {
  const compProps = { label, placeholder, id, formId }
  const { colors } = useTheme()
  const renderInput = React.useCallback(() => {
    {
      switch (type) {
        case "text":
          return <FormInputContainer {...compProps} />
        case "radio":
          return <FormRadioContainer {...compProps} />
        case "dropdown":
          return <FormSelectorContainer {...compProps} />
        case "chip":
          return <FormMultiSelectContainer  {...compProps}/>
        case "capture":
          return <FormCaptureContainer {...compProps} />
        case "location":
          return <FormCoordinatesInputContainer {...compProps} />
        case "date":
          return <FormDateInputContainer isInvalid={!isNil(error)} {...compProps} />
        case "form":
          return <SubformContainer {...compProps} />
        default:
          logger.warn("Unknown type: '" + type + "' in InputFieldMapper")
          return null
      }
    }
  }, [type, id, placeholder, label, error, warn])

  const isError = !isNil(error)
  const isWarn = !isNil(warn)
  return (
    <FormControl isRequired={isRequired} isInvalid={isError}>
      <Stack mb={3}>
        <FormControl.Label accessibilityLabel={label}>{label}</FormControl.Label>

        <Box mb={1} flex={1}>
          {renderInput()}
        </Box>

        {isLoadingRequest && (
          <Progress.Bar
            indeterminate
            color={colors["primary"][500]}
            borderRadius={0}
            width={null}
          />
        )}
        <FormControl.HelperText _text={{color:'warning.500'}} accessibilityLabel={label}>
          {warn}
        </FormControl.HelperText>
        <FormControl.ErrorMessage isInvalid={isError} accessibilityLabel={label}>
          {error}
        </FormControl.ErrorMessage>
      </Stack>
    </FormControl>
  )
}
