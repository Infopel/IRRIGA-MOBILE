import { MaterialIcons } from "@expo/vector-icons"
import { Divider, HStack, Icon, IconButton, IInputProps, Input, View, VStack } from "native-base"
import { navigate } from "navigators"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"

export interface SearchBarProps extends IInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  value?: string
  placeholder: string
}

/**
 * Describe your component here
 */
export const SearchBar = function SearchBar(props: SearchBarProps) {
  const { placeholder, value, onChangeText, ...rest } = props
  const handleNavigateToQrCode = () => navigate("camera", { qrcode: true })
  return (
    <Input
      {...rest}
      leftElement={<Icon mx={2} size={"lg"} as={MaterialIcons} name="search" />}
      onChangeText={onChangeText}
      value={value}
      spellCheck
      rightElement={
        <HStack alignItems={"center"} h={"full"}>
          <Divider
            h={"8"}
            orientation="vertical"
            _light={{
              bg: "muted.300",
            }}
            _dark={{
              bg: "muted.900",
            }}
          />
          <IconButton
            onPress={handleNavigateToQrCode}
            icon={<Icon as={MaterialIcons} name="qr-code-scanner" />}
          />
        </HStack>
      }
      placeholder={placeholder}
    />
  )
}
