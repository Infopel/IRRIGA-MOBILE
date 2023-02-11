import { observer } from "mobx-react-lite"
import { Radio, Stack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { useStores } from "models"
import { FormInput } from "../FormInput.types"
import { FormRadioStyles as styles } from "./form-radio.styles"

export interface FormRadioProps extends FormInput {
  /**
   * An optional style override useful for padding & margin.
   */
  //  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormRadioContainer = observer(function FormRadio({ id, formId }: FormRadioProps) {
  const {
    formStore: { getField, updateField, getFieldOutput },
  } = useStores()

  const field = getField(id, formId)

  if (!field) return null

  return (
    <Radio.Group
      testID="formRadioContainer"
      name={id}
      onChange={updateField?.bind(this, id)}
      value={getFieldOutput(id)?.value}
    >

      {field.options?.map(({ id, name }) => (
        <Radio key={id} value={id + ""} >
          {name}
        </Radio>
      ))}

    </Radio.Group>
  )
})
