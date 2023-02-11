import { MaterialIcons } from "@expo/vector-icons"
import { Database } from "@nozbe/watermelondb"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { RegadioBottomSheet } from "components/regadio-bottom-sheet/regadio-bottom-sheet.component"
import { RegadiosListItem } from "components/regadios-list-item/regadios-list-item.component"
import { Divider, FlatList, useDisclose, VStack, Fab, Icon, Text } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { findAllWaterSupplies, WaterSupplyListItem } from "storage/queries/water-supplies"

export interface RegadiosListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  items?: WaterSupplyListItem[]
  queryText?: string
}

/**
 * Describe your component here
 */
const _RegadiosList = function RegadiosList(props: RegadiosListProps) {
  const { style } = props
  const [regadio, setRegadio] = React.useState<string>()
  const { onClose, isOpen, onOpen, onToggle } = useDisclose()

  const handleSetRegadio = (reg?: string) => {
       setRegadio(reg)
    if (reg) {
      onOpen()
    } else onClose()
  }

  const handleNavigate = () => navigate("form", { formId: "water_supply" })
  return (
    <VStack flex={1}>
      <FlatList
        data={props.items}
        ListEmptyComponent={
          !props.items || props.items.length === 0 ? <Text>Lista Vazia</Text> : undefined
        }
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <RegadiosListItem item={item} onPress={handleSetRegadio.bind(this, item.id)} />
        )}
      />

      {regadio && (
        <RegadioBottomSheet
          itemId={regadio}
          isVisible={isOpen}
          onClose={onClose}
        />
      )}
      <Fab
        renderInPortal={false}
        shadow={2}
        placement="bottom-right"
        size="sm"
        onPress={handleNavigate}
        icon={<Icon color="white" as={MaterialIcons} name="person-add" size="5" />}
        label="Novo Regadio"
      />
    </VStack>
  )
}

export const RegadiosList = withDatabase(
  withObservables(
    ["database", "queryText"],
    ({ database, queryText }: { database: Database; queryText: string }) => ({
      items: findAllWaterSupplies(database, queryText),
    }),
  )(_RegadiosList),
)
