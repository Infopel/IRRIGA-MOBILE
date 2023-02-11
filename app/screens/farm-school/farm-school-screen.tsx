import { MaterialIcons } from "@expo/vector-icons"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Fab, Icon } from "native-base"
import React, { FC } from "react"
import { Screen } from "../../components"
import { navigate, NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"


// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `farmSchool: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="farmSchool" component={FarmSchoolScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const FarmSchoolScreen: FC<StackScreenProps<NavigatorParamList, "farmSchool">> = observer(function FarmSchoolScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen preset="fixed">
      <Fab icon={<Icon as={MaterialIcons} name='add-circle' size={'md'} />} label='Nova Escola' renderInPortal={false} onPress={navigate.bind(this, "form", { formId: 'farm_school_register', loadPrevious: false })} />
    </Screen>
  )
})
