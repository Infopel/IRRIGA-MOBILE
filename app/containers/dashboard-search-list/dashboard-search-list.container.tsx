import { MaterialIcons } from "@expo/vector-icons"
import { Database } from "@nozbe/watermelondb"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { BeneficiaryInfoBottomSheet } from "components/beneficiary-info-bottom-sheet/beneficiary-info-bottom-sheet.component"
import { DashboardSearchListItem } from "components/dashboard-search-list-item/dashboard-search-list-item.component"
import { Fab, FlatList, HStack, Icon } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { Association, IBeneficiaryItem, findAllBeneficiariesAndAssociations } from "storage/queries"
import { DashboardSearchListStyles as styles } from "./dashboard-search-list.styles"
export interface DashboardSearchListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  searchList: IBeneficiaryItem[] | Association[]
  searchText?: string
}

/**
 * Describe your component here
 */
function DashboardSearchList(props: DashboardSearchListProps) {
  const { style, searchList } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  // const {
  //   homeStore: { searchList, search },
  // } = useStores()
  // const isFocused = useIsFocused()
  // React.useEffect(() => {
  //   database
  //     .get(Response.table)
  //     .query()
  //     .fetch()
  //     .then((responses) => {
  //       console.tron.debug({ "form responses": responses }, true)
  //     })
  //     .catch(console.tron.reportError)
  // }, [])

  const handleNavigation = () => navigate("form", { formId: "beneficiary" })
  const [selectedSearchItem, setSelectedSearchItem] = React.useState<IBeneficiaryItem | Association>()

  return (
    <HStack flex={1} testID="dashboardSearchListContainer">
      <FlatList
        data={searchList}
        flex={1}
        renderItem={({ item }) => (
          <DashboardSearchListItem item={item} onSelect={setSelectedSearchItem.bind(this, item)} />
        )}
      />
      <Fab
        renderInPortal={false}
        shadow={2}
        placement="bottom-right"
        size="sm"
        onPress={handleNavigation}
        icon={<Icon color="white" as={MaterialIcons} name="person-add" size="5" />}
        label="Novo Beneficiário"
      />
      {
        selectedSearchItem &&
        <BeneficiaryInfoBottomSheet
          onClose={setSelectedSearchItem.bind(this, undefined)}
          isVisible={selectedSearchItem !== undefined}
          beneficiaryId={selectedSearchItem.id}
        />
      }
    </HStack>
  )
}

export const DashboardSearchListContainer = withDatabase(
  withObservables(
    ["database", "searchText"],
    ({ database, searchText }: { database: Database; searchText: string }) => {
      return { searchList: findAllBeneficiariesAndAssociations(database, searchText) }
    },
  )(DashboardSearchList),
)
