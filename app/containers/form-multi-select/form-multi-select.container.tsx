import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { FormInput } from "../FormInput.types"

import { MultiSelect } from "components"
import { intersectionWith } from "lodash"
import { useStores } from "models"

export interface FormMultiSelectProps extends FormInput {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormMultiSelectContainer = observer(function FormMultiSelect(
  props: FormMultiSelectProps,
) {
  const { style, label, id, formId } = props

  const {
    formStore: { getField, updateField: updateMultiValueField, getFieldOutput },
  } = useStores()
  const field = getField(id, formId)

  if (!field) return null
  const handleOnSelectedItems = (selectedItem: number | string | null, itemIds: string[]) => {
    updateMultiValueField(props.id, itemIds)
  }

  const selectedChips = intersectionWith(
    field.options,
    getFieldOutput(id)?.multiValue ?? [],
    (item, id) => item.id == id,
  )

  return (
    <>
      <MultiSelect
        options={field.options?.slice() ?? []}
        // selectedItems={getFieldOutput(id)?.multiValue ?? []}
        label={field.placeholder}
        selectedItems={selectedChips}
        onSelectItems={handleOnSelectedItems}
      />
    </>
  )
})
