import { Circle, Heading, HStack, IStackProps, Text, VStack } from "native-base"
import * as React from "react"
import { DateUtils, TextUtils } from "utils"

interface EarningsItem {
  culture: string
  price: number
  date?: number
}
export interface EarningsListItemProps extends IStackProps {
  /**
   * An optional style override useful for padding & margin.
   */
  item: EarningsItem
}

/**
 * Describe your component here
 */
export const EarningsListItem = function EarningsListItem(props: EarningsListItemProps) {
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
          {item.culture[0]}
        </Circle>
        <VStack flex={1}>
          <Heading size={"md"}>{item.culture}</Heading>
          {item.date && <Text>{DateUtils.prettyDate(item.date)}</Text>}
        </VStack>
        <Text>{TextUtils.parseMoney(item.price)}</Text>
      </HStack>
    </HStack>
  )
}
