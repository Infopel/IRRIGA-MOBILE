import { StackScreenProps } from "@react-navigation/stack"
import { Screen, SearchBar } from "components"
import { NavigatorParamList } from "navigators"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { DashboardSearchListContainer, RecentFormContainer } from "../../containers"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `dashboard: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="dashboard" component={DashboardScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const BeneficiariesScreen: FC<
  StackScreenProps<NavigatorParamList, "beneficiaries">
> = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [text, setText] = React.useState<string>()
  return (
    <Screen flex={1} testID="dashboard-screen">
      <RecentFormContainer />
      <SearchBar
        my={2}
        value={text}
        placeholder="Procurar Beneficiário ou Associação"
        onChangeText={setText}
      />
      <DashboardSearchListContainer searchText={text} />
    </Screen>
  )
}
