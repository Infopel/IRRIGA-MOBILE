import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"

import { Circle, Heading, HStack, Pressable, Text, VStack } from "native-base"
import { Association, IBeneficiaryItem } from "../../services/storage/queries"
import { TextUtils } from "../../utils/TextUtils"
import { DashboardSearchListItemStyles as styles } from "./dashboard-search-list-item.styles"

export interface DashboardSearchListItemProps {
  item: IBeneficiaryItem | Association
  style?: StyleProp<ViewStyle>
  onSelect: () => void
}

/**
 * Describe your component here
 */
export const DashboardSearchListItem = function DashboardSearchListItem(
  props: DashboardSearchListItemProps,
) {
  const { style, item, onSelect } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <Pressable
      onPress={onSelect}
      borderWidth={1}
      borderRadius={8}
      mb={2}
      borderColor="coolGray.300"
      _pressed={{
        backgroundColor: "secondary.100",
      }}
    >
      <HStack style={containerStyle} space={2} alignItems="center">
        <Circle bg="secondary.200" p={4} _text={{ fontSize: 24 }} borderRadius={"full"}>
          {TextUtils.getInitials(item.name)}
        </Circle>
        <VStack>
          <Heading size={"md"}>{item.name}</Heading>
          <Text>Beneficiário</Text>
        </VStack>
      </HStack>
    </Pressable>
  )
}
