import { observer, useObserver } from "mobx-react"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { Capture } from "components/capture/capture.component"
import { useStores } from "models/root-store/root-store-context"
import { FormInput } from "../FormInput.types"
import { getSnapshot } from "mobx-state-tree"
import logger from "utils/logger"

export interface FormCaptureProps extends FormInput {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  label: string
}

/**
 * Describe your component here
 */
export const FormCaptureContainer = observer(function FormCapture(props: FormCaptureProps) {
  const { id, label, formId } = props

  const {
    formStore: { getField, updateField: updateMultiValueField, getFieldOutput },
  } = useStores()

  const field = getField(id, formId)
  const fieldOutput = getFieldOutput(id)

  if (!field) return null
  const { placeholder } = field

  const handleOnChange = (images: string[]) => {
    updateMultiValueField(id, images)
  }

  const images = fieldOutput?.multiValue ?? []
  // logger.log({images})

  return <Capture images={images.slice()} label={label} onChange={handleOnChange} />
})
