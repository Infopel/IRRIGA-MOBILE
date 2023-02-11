import { MaterialIcons } from "@expo/vector-icons"
import { Database } from "@nozbe/watermelondb"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { StackScreenProps } from "@react-navigation/stack"
import { AppToolbar, ComerceListItem, CreateComerceModel, Screen } from "components"
import { observer } from "mobx-react-lite"
import { Fab, FlatList, Heading, Icon, useDisclose, VStack } from "native-base"
import { navigate, NavigatorParamList } from "navigators"
import React, { FC } from "react"
import { Commerce } from "storage/queries"
import {
  findAllAgregatedCommercies,
  findAllCommerciesInDescentOrder,
} from "storage/queries/commecies"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `comerce: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="comerce" component={ComerceScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
export interface CommerceScreenProps extends FC<StackScreenProps<NavigatorParamList, "comerce">> {
  recent: Commerce[]
  agregate: Commerce[]
}

export const _ComerceScreen: React.FunctionComponent<CommerceScreenProps> = observer(
  function ComerceScreen({ recent, agregate }) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const { isOpen, onClose, onOpen } = useDisclose()
    return (
      <VStack flex={1}>
        <AppToolbar title={"Comercio"} back />
        <Screen flex={1} preset="fixed">
          <Heading mb={3} mt={3}>
            Agregado
          </Heading>
          <FlatList
            flexGrow={0}
            data={agregate}
            renderItem={({ item: { name, price, weight } }) => (
              <ComerceListItem {...{ item: { ...{ price, weight, culture: name } } }} />
            )}
          />
          <Heading mb={3} mt={5}>
            Recente
          </Heading>
          <FlatList
            flex={1}
            data={recent}
            renderItem={({ item: { name, price, weight } }) => (
              <ComerceListItem {...{ item: { ...{ price, weight, culture: name } } }} />
            )}
          />
          <Fab icon={<Icon as={MaterialIcons} name="add" />} onPress={navigate.bind(this, 'form', { formId: "agro_commerce_monitoring", loadPrevios: false })} />
        </Screen>
        {/* <CreateComerceModel isOpen={isOpen} onClose={onClose} /> */}
      </VStack>
    )
  },
)

export const ComerceScreen = withDatabase(
  withObservables([], ({ database }: { database: Database }) => {
    return {
      recent: findAllCommerciesInDescentOrder(database),
      agregate: findAllAgregatedCommercies(database),
    }
    //@ts-ignore
  })(_ComerceScreen),
)
