import { Circle, Heading, HStack, IStackProps, Text, VStack } from "native-base"
import * as React from "react"
import { DateUtils, TextUtils } from "utils"

interface FormationParticipantsItem {
  id: string
  name: string
}
export interface FormationParticipantsListItemProps extends IStackProps {
  /**
   * An optional style override useful for padding & margin.
   */
  item: FormationParticipantsItem
}

/**
 * Describe your component here
 */
export const FormationParticipantsListItem = function FormationParticipantsListItem(
  props: FormationParticipantsListItemProps,
) {
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
        <Circle bg="secondary.200" py={2} px={4} _text={{ fontSize: 'lg' }} borderRadius={"full"}>
          {item.name[0]}
        </Circle>
        <Text fontSize={'lg'}>{item.name}</Text>
      </HStack>
    </HStack>
  )
}
