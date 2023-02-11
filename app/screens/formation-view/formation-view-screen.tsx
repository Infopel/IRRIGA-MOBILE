import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ViewStyle } from "react-native"
import {
  AddFormationParticipantsModel,
  AppToolbar,
  FormationParticipantsListItem,
  Screen,
} from "../../components"
import { NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { MaterialIcons } from "@expo/vector-icons"
import { FlatList, Heading, HStack, Icon, Text, useDisclose, VStack } from "native-base"
import { DateUtils } from "utils"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `formationView: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="formationView" component={FormationViewScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const FormationViewScreen: FC<
  StackScreenProps<NavigatorParamList, "formation_view">
> = observer(function FormationViewScreen(props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const { isOpen, onClose, onOpen } = useDisclose()
  const startDate = 1653429600000
  const endDate = 1683429600000

  return (
    <VStack flex={1}>
      <AppToolbar
        //@ts-ignore
        title={props.route.params.name}
        back
      />
      <Screen flex={1} preset="fixed">
        <Heading mt={2}>Período</Heading>
        <HStack alignItems="center" mt={2} space={1}>
          <Icon as={MaterialIcons} name="date-range" color="text.400" />
          <Text color="text.400">{DateUtils.prettyDate(startDate)}</Text>
          <Icon color="text.400" as={MaterialIcons} name="trending-flat" />
          <Text color="text.400"> {DateUtils.prettyDate(endDate)}</Text>
        </HStack>
        <Heading mt={4} mb={3}>
          Participantes
        </Heading>
        <FlatList
          flex={1}
          data={[
            {
              id: "asdsa",
              name: "Fernando Torres",
            },
            { id: "wasdsa", name: "Maria Larissa" },
            { id: "asdsas", name: "Mateus Amorim" },
            { id: "assdsa", name: "João Pedro" },
            { id: "wasdsa", name: "Luisa Antonia" },
          ]}
          renderItem={({ item }) => <FormationParticipantsListItem item={item} />}
        />
        <AddFormationParticipantsModel
          participants={[
            {
              id: "asdsa",
              name: "Fernando Torres",
            },
            { id: "wasdsa", name: "Maria Larissa" },
            { id: "asdsas", name: "Mateus Amorim" },
            { id: "assdsa", name: "João Pedro" },
            { id: "wasdsa", name: "Luisa Antonia" },
          ]}
        />
      </Screen>
    </VStack>
  )
})
