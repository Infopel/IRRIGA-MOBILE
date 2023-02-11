import { isNil } from "lodash"
import { observer } from "mobx-react-lite"
import { useStores } from "models"
import { Input } from "native-base"
import * as React from "react"
import {
  NativeSyntheticEvent,
  StyleProp,
  TextInputKeyPressEventData,
  ViewStyle,
} from "react-native"
import { TextFormatter } from "utils/TextFormatter"
import { FormInput } from "../FormInput.types"
import { getRightElement } from "./form-input.elements"
import { formatText, getKeyboardType } from "./form-input.keyboard"
import { FormInputStyles as styles } from "./form-input.styles"

export interface FormInputProps extends FormInput {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormInputContainer = observer(function FormInput(props: FormInputProps) {
  const { style, id, formId } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  const {
    formStore: { getField, updateField, getFieldOutput },
  } = useStores()

  const field = getField(id, formId)
  const output = getFieldOutput(id)
  const text = output?.value
  const isInvalidField = !isNil(output?.error)

  const handleOnKeyPressed = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const key = event.nativeEvent.key
    if (key === "Backspace") {
      let newText = ""
      if (!text || text?.length <= 0) {
        newText = text ?? ""
      } else {
        newText = text.slice(0, text.length - 1)
      }

      updateField(id, newText)

      return
    }

    const newText = (text ?? "") + key

    if (field?.validators?.contentType) {
      updateField(id, TextFormatter.clearAllFormatting(newText))
    } else {
      updateField(id, newText)
    }
  }

  if (!field) return null

  const isInputSupposedToBeFormatted = isNil(field?.validators?.contentType)
    ? false
    : field.validators?.contentType === "textarea"
    ? false
    : true
  const formattedText = formatText(field?.validators?.contentType, text, "")
  

  return (
    <Input
      testID="formInputContainer"
      style={containerStyle}
      textAlignVertical={field.validators?.contentType === "textarea" ? "top" : undefined}
      autoCapitalize={field.validators?.contentType === "paper-entity-code" ? 'characters' : 'none'}
      numberOfLines={field.validators?.contentType === "textarea" ? 6 : undefined}
      onKeyPress={isInputSupposedToBeFormatted ? handleOnKeyPressed : undefined}
      value={formattedText}
      keyboardType={getKeyboardType(field.validators?.contentType)}
      placeholder={props.label}
      InputRightElement={getRightElement(
        field.validators?.contentType ?? undefined,
        isInvalidField,
      )}
      onChangeText={isInputSupposedToBeFormatted ? undefined : updateField.bind(this, id)}
    />
  )
})
