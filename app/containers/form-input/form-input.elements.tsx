import { MaterialIcons } from "@expo/vector-icons"
import { Validator } from "models"
import { Divider, HStack, IBoxProps, Icon, Text } from "native-base"
import * as React from "react"
export function getRightElement(
  val?: Validator["contentType"],
  isInvalid: boolean = false,
): JSX.Element | undefined {
  if (val === "money")
    return (
      <HStack alignItems={"center"} mr={1}>
        <Text color={isInvalid ? "red.400" : "text.400"} fontSize={"xs"}>
          MT
        </Text>
        <Div mx='2'/>
        <Text mr='2' color={isInvalid ? "red.400" : "text.400"} fontSize={"xs"}>
          $
        </Text>
      </HStack>
    )
  if (val === "duat")
    return (
      <HStack alignItems={"center"} mr={1}>
        <Text color={isInvalid ? "red.400" : "text.400"} fontSize={"xs"}>
          DUAT
        </Text>
      </HStack>
    )
  if (val === "tel")
    return (
      <HStack alignItems={"center"} mr={1}>
        <Div />
        <_Icon {...{ isInvalid, name: "phone" }} />
      </HStack>
    )
  if (val === "number")
    return (
      <HStack alignItems={"center"} mr={1}>
        <Div />
        <_Icon {...{ isInvalid, name: "tag" }} />
      </HStack>
    )
}

const Div = (props:IBoxProps) => <Divider {...props} thickness={1} mr={2} height="8" orientation="vertical" />
const _Icon = ({ name, isInvalid }: { name: string; isInvalid: boolean }) => (
  <Icon as={MaterialIcons} name={name} color={isInvalid ? "red.400" : "text.400"} fontSize={"xs"} />
)
