import { MaterialIcons } from "@expo/vector-icons"
import { isNil } from "lodash"
import { Box, HStack, Icon, IconButton, Spinner, Text } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { CoordinatesInputStyles as styles } from "./coordinates-input.styles"

export interface CoordinatesInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  onPress: () => void
  isLoading?: boolean
  isDisabled?: boolean
  coord?: { lat: number; lng: number }
}

/**
 * Describe your component here
 */
export const CoordinatesInput = function CoordinatesInput(props: CoordinatesInputProps) {
  const { coord, onPress, isLoading = false, isDisabled = false } = props

  const isEmpty = isNil(coord)
  const isBtnDisabled = isLoading || isDisabled

  return (
    <HStack alignItems="center">
      <IconButton
        onPress={isBtnDisabled ? undefined : onPress}
        android_ripple={{
          foreground: true,
          borderless: true,
          radius: 18,
        }}
        borderRadius={"full"}
        _pressed={{
          bgColor: "primary.300",
        }}
        bgColor={isDisabled ? "primary.200" : "primary.500"}
        zIndex={4}
      >
        {isLoading ? (
          <Spinner color={"white"} animating />
        ) : (
          <Icon
            as={MaterialIcons}
            color={isDisabled ? "light.300" : "white"}
            name="location-on"
            size="md"
          />
        )}
      </IconButton>
      <Box bgColor={"secondary.600"} pl={5} pr={3} ml={-3} zIndex={1} borderRightRadius="full">
        <Text color={isEmpty ? "muted.300" : "white"} noOfLines={1}>
          {coord?.lat ?? "00.000000"}
        </Text>
      </Box>
      <Box bgColor={"secondary.400"} pl={5} pr={3} ml={-3} borderRightRadius="full">
        <Text color={isEmpty ? "muted.300" : "white"} noOfLines={1}>
          {coord?.lng ?? "00.000000"}
        </Text>
      </Box>
    </HStack>
  )
}
