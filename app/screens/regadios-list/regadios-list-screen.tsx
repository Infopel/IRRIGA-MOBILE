import { StackScreenProps } from "@react-navigation/stack"
import { RecentFormContainer } from "containers/recent-form"
import React, { FC } from "react"
import { RegadiosList, Screen, SearchBar } from "../../components"
import { NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `regadiosList: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="regadiosList" component={RegadiosListScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const RegadiosListScreen: FC<StackScreenProps<NavigatorParamList, "list">> = () => {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const [searchText, setSearchText] = React.useState<string>()
  return (
    <Screen>
      <RecentFormContainer />
      <SearchBar
        placeholder="Nome do regadio"
        onChangeText={setSearchText}
        value={searchText}
        my={2}
      />
      <RegadiosList queryText={searchText}/>
    </Screen>
  )
}
