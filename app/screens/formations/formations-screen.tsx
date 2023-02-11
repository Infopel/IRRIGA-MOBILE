import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import { AppToolbar, CreateFormationModel, Screen } from "../../components"
import { navigate, NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { MaterialIcons } from "@expo/vector-icons"
import { FormationListItem } from "components"
import { Fab, FlatList, Icon, useDisclose, VStack } from "native-base"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `formations: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="formations" component={FormationsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const FormationsScreen: FC<StackScreenProps<NavigatorParamList, "formations">> = observer(
  function FormationsScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const { isOpen, onClose, onOpen } = useDisclose()
    return (
      <VStack flex={1}>
        <AppToolbar title={"Formações"} back />
        <Screen mt={2}>
          <FlatList
            flex={1}
            data={[
              {
                id: "sdsfdd",
                name: "AgroPequaria",
                startDate: 1653429600000,
                endDate: 1683429600000,
              },
              {
                id: "dsfdsffasdas",
                name: "Sementaira com Tomate",
                startDate: 1653429600000,
                endDate: 1683429600000,
              },
              {
                id: "sdsfd",
                name: "Irrigacao",
                startDate: 1653429600000,
                endDate: 1683429600000,
              },
            ]}
            renderItem={({ item }) => <FormationListItem item={item} />}
          />
          <Fab icon={<Icon as={MaterialIcons} name="add" />} onPress={navigate.bind(this, 'form', { formId: "formation" })} />
        </Screen>
      </VStack>
    )
  },
)
