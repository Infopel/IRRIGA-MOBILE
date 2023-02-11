import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"

import { observer } from "mobx-react"
import { Field, useStores } from "models"
import { EmptyField } from "./empty-field"
import { FormField } from "./form-field"

export interface InputFieldMapperProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  type: Field["type"]
  label: string
  placeholder?: string
  id: string
  formId: string
  isRequired: boolean
}

/**
 * Describe your component here
 */
export const InputFieldMapper = observer(function (props: InputFieldMapperProps) {
  const { id, formId, type, placeholder, isRequired } = props

  const store = useStores()
  
  const {
    formStore: { getField, getFieldOutput },
  } = store 

  const field = getField(id, formId)
  const output = getFieldOutput(id)

  if (field?.isDisabled || !field) {
    return <EmptyField />
  }

  return (
    <FormField
      formId={formId}
      id={field.id}
      isLoadingRequest={field?.isLoadingRequest}
      isRequired={isRequired}
      label={field.label}
      placeholder={placeholder}
      type={field.type}
      error={output?.error}
      warn={output?.warn}
    />
  )
})
