import withObservables from "@nozbe/with-observables"
import { Avatar, Heading, HStack, IStackProps, Text, VStack } from "native-base"
import * as React from "react"
import { TextUtils } from "utils"
interface ComerceItem {
  culture: string
  price: number
  weight: number
}
export interface ComerceListItemProps extends IStackProps {
  /**
   * An optional style override useful for padding & margin.
   */
  item: ComerceItem
  name: string
}

/**
 * Describe your component here
 */
const _ComerceListItem = function ComerceListItem(props: ComerceListItemProps) {
  const { style, item, name } = props
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
        <Avatar _text={{ fontSize: 24 }} borderRadius={"full"}>
          {item.culture}
        </Avatar>
        <VStack flex={1}>
          <Heading size={"md"}>{name}</Heading>
          <Text>{TextUtils.parseWeight(item.weight)}</Text>
        </VStack>
        <Text>{TextUtils.parseMoney(item.price)}</Text>
      </HStack>
    </HStack>
  )
}

export const ComerceListItem = withObservables(["item"], ({ item }: { item: ComerceItem }) => ({
  name: item.culture,
}))(_ComerceListItem)
