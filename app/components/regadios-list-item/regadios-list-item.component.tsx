import { MaterialIcons } from "@expo/vector-icons"
import { Avatar, HStack, Icon, IconButton, Pressable, Text, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { WaterSupplyListItem } from "storage/queries/water-supplies"
import { TextUtils } from "utils"

export interface RegadiosListItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: WaterSupplyListItem
  onPress: () => void
}

/**
 * Describe your component here
 */
export const RegadiosListItem = function RegadiosListItem(props: RegadiosListItemProps) {
  const {
    style,
    item: { name, progress, id },
    onPress,
  } = props

  return (
    <Pressable
      accessibilityRole="link"
      onPress={onPress}
      accessibilityLabel={name}
      // android_ripple={{
      //   color: "red",
      //   radius: 10,
      //   borderless: true,
      //   foreground: true,
      // }}
      _pressed={{
        opacity: 0.5,
      }}
    >
      <HStack my={2}>
        <Avatar>{TextUtils.getInitials(name)}</Avatar>
        <VStack mx={2} flex={1}>
          <Text>{name}</Text>
          <Text>{progress} %</Text>
        </VStack>
        <IconButton icon={<Icon as={MaterialIcons} name="directions" />} />
      </HStack>
    </Pressable>
  )
}
