import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { Button, Circle, Heading, HStack, Icon, IStackProps, Pressable, Text, VStack } from "native-base"
import { navigate } from "navigators"
import * as React from "react"
import { DateUtils, TextUtils } from "utils"

interface FormationItem {
  id: string
  name: string
  startDate: number
  endDate: number
}
export interface FormationListItemProps extends IStackProps {
  /**
   * An optional style override useful for padding & margin.
   */
  item: FormationItem
}

/**
 * Describe your component here
 */
export const FormationListItem = function FormationListItem(props: FormationListItemProps) {
  const { style, item } = props

  return (
    <Pressable
      onPress={navigate.bind(this, "formation_view", { id: item.id, name: item.name })}
      m={0}
      p={0}
    >
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
            <Heading size={"md"}>{item.name}</Heading>
            <HStack alignItems="center" mt={2} space={1}>
              <Icon as={MaterialIcons} name="date-range" color="text.400" />
              <Text color="text.400">{DateUtils.prettyDate(item.startDate)}</Text>
              <Icon color="text.400" as={MaterialIcons} name="trending-flat" />
              <Text color="text.400"> {DateUtils.prettyDate(item.endDate)}</Text>
            </HStack>
          </VStack>
        </HStack>
      </HStack>
    </Pressable>
  )
}
