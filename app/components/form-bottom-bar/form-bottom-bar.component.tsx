import { observer } from "mobx-react-lite"
import { Button, HStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { useStores } from "models"
import { FormBottomBarStyles as styles } from "./form-bottom-bar.styles"

export interface FormBottomBarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  nextPage: () => void
  previousPage: () => void
  firstPage: boolean
  lastPage: boolean
  saveForm: () => void
}

/**
 * Describe your component here
 */
export const FormBottomBar = observer(function (props: FormBottomBarProps) {
  const { style, nextPage, previousPage, lastPage, firstPage, saveForm } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <HStack space={2} style={containerStyle}>
      <Button variant="outline" flex={1} isDisabled={firstPage} onPress={previousPage}>
        Anterior
      </Button>
      {!lastPage && (
        <Button isDisabled={lastPage} flex={1} onPress={nextPage}>
          Próximo
        </Button>
      )}
      {lastPage && (
        <Button isDisabled={!lastPage} flex={1} onPress={saveForm}>
          Concluir
        </Button>
      )}
    </HStack>
  )
})
