import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { RegadiosMap, Screen } from "../../components"
import { NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `regadiosMapList: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="regadiosMapList" component={RegadiosMapListScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const RegadiosMapListScreen: FC<StackScreenProps<NavigatorParamList, "map_list">> = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen>
      <RegadiosMap />
    </Screen>
  )
}
