import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { navigate, NavigatorParamList } from "../../navigators"
import { AppToolbar, Screen, CreateEarningModel } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { Fab, FlatList, Heading, Icon, useDisclose, VStack } from "native-base"
import { EarningsListItem } from "components"
import { MaterialIcons } from "@expo/vector-icons"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `irrigation: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="irrigation" component={IrrigationScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const EarningsScreen: FC<StackScreenProps<NavigatorParamList, "earnings">> = observer(
  function EarningScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    const { isOpen, onClose, onOpen } = useDisclose()
    return (
      <VStack flex={1}>
        <AppToolbar title={"Rendimento"} back />
        <Screen flex={1} preset="fixed">
          <Heading mb={3} mt={3}>
            Agregado
          </Heading>
          <FlatList
            flexGrow={0}
            data={[
              {
                id: "sdsfd",
                culture: "Batata",
                price: 52000,
              },
              { id: "dsfdsf", culture: "Tomato", price: 450000 },
            ]}
            renderItem={({ item }) => <EarningsListItem item={item} />}
          />
          <Heading mb={3} mt={5}>
            Recente
          </Heading>
          <FlatList
            flex={1}
            data={[
              {
                id: "sdsfdd",
                culture: "Batata",
                date: 1500,
                price: 32000,
              },
              { id: "dsfdsffasdas", culture: "Tomato", date: 1500, price: 450000 },
              {
                id: "sdsfd",
                culture: "Batata",
                date: 500,
                price: 20000,
              },
            ]}
            renderItem={({ item }) => <EarningsListItem item={item} />}
          />
          <Fab icon={<Icon as={MaterialIcons} name="add" />} onPress={navigate.bind(this, 'form', { formId: "agro_income_monitoring", loadPrevios: false })} />
        </Screen>
        <CreateEarningModel isOpen={isOpen} onClose={onClose} />
      </VStack>
    )
  },
)
