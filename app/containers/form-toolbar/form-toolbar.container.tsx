import { FormToolbarSkeleton } from "components/form-toolbar-skeleton/form-toolbar-skeleton.component"
import { observer } from "mobx-react-lite"
import { useStores } from "models"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { FormToolbar, Text } from "../../components"

export interface FormToolbarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormToolbarContainer = observer((props: FormToolbarProps) => {
  const {
    formStore: { isRequestingForm, changePage, pageInfo, error },
  } = useStores()

  if (isRequestingForm) {
    return <FormToolbarSkeleton/>
  }

  if (!pageInfo) return null
  return (
    <>
      <FormToolbar {...{ ...pageInfo, changePage, error }} />
    </>
  )
})
