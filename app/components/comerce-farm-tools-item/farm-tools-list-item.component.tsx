import { Circle, Heading, HStack, IStackProps, Text, VStack } from "native-base"
import * as React from "react"
import { DateUtils, TextUtils } from "utils"

export interface FarmToolsItem {
  id: string
  name: string
  description: string
  unit: "unit" | "kg"
  quantity: number
  receptionDate: number
}
export interface FarmToolsListItemProps extends IStackProps {
  /**
   * An optional style override useful for padding & margin.
   */
  item: FarmToolsItem
}

/**
 * Describe your component here
 */
export const FarmToolsListItem = function FarmToolsListItem(props: FarmToolsListItemProps) {
  const { style, item } = props

  return (
    <HStack
      borderWidth={1}
      borderRadius={8}
      mb={2}
      borderColor="coolGray.300"
      // _pressed={{
      //   backgroundColor: "secondary.100",
      // }}
      p={2}
    >
      <HStack space={2} flex={1} alignItems="center">
        <Circle bg="secondary.200" py={3} px={5} _text={{ fontSize: 24 }} borderRadius={"full"}>
          {item.name[0]}
        </Circle>
        <VStack flex={1}>
          <HStack alignItems="center" justifyContent={'space-between'}>
            <Heading size={"md"}>{item.name}</Heading>
            <Text>{DateUtils.prettyDate(item.receptionDate)}</Text>
          </HStack>
          <Text>{item.description}</Text>
          <Text>{item.unit === "kg" ? TextUtils.parseWeight(item.quantity) : item.quantity}</Text>
        </VStack>
      </HStack>
    </HStack>
  )
}
