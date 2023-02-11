import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../navigators"
import {
  AppToolbar,
  Screen,
  CreateFarmToolsModel,
  FarmToolsListItem,
  FarmToolsItem,
} from "components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { Fab, Icon, useDisclose, VStack } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `farmTools: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="farmTools" component={FarmToolsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const FarmToolsScreen: FC<StackScreenProps<NavigatorParamList, "farmTools">> = observer(
  function FarmToolsScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const { isOpen, onClose, onOpen } = useDisclose()
    return (
      <VStack flex={1}>
        <AppToolbar title={"Insumos"} back />
        <Screen flex={1} mt={2} preset="fixed">
          <FlatList
            data={
              [
                {
                  id: "sdsfd",
                  name: "Fertilizante",
                  description: "Fertilizante para plantas",
                  receptionDate: 1653429600000,
                  unit: "kg",
                  quantity: 1,
                },
                {
                  id: "dsfdsf",
                  name: "Tractor",
                  description: "MF 1745D Round Baler",
                  unit: "unit",
                  quantity: 1,
                  receptionDate: 1656429600000,
                },
              ] as FarmToolsItem[]
            }
            renderItem={({ item }) => <FarmToolsListItem item={item} />}
          />

          <Fab icon={<Icon as={MaterialIcons} name="add" />} onPress={navigate.bind(this, 'form', { formId: 'farm_tools_distribuition', loadPrevious: false })} />
        </Screen>
        <CreateFarmToolsModel isOpen={isOpen} onClose={onClose} />
      </VStack>
    )
  },
)
