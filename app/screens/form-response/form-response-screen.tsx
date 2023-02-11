import { Screen } from "components"
import { Box, Text } from "native-base"
import { ScreenNavigationProps } from "navigators"
import React from "react"

interface FormResponseScreenProps extends ScreenNavigationProps<"form_responses">{}
export function FormResponseScreen(props: FormResponseScreenProps) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen>
      <Text>
        Text
      </Text>
    </Screen>
  )
}
