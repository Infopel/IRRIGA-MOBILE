import { HStack, IconButton, StatusBar, Text, Icon, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { goBack } from "navigators"
import { MaterialIcons } from "@expo/vector-icons"

export interface AppToolbarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  title: string
  back?: boolean
}

/**
 * Describe your component here
 */
export const AppToolbar = function AppToolbar(props: AppToolbarProps) {
  const { style, title, back = false } = props
  return (
    <VStack>
      <StatusBar barStyle="light-content" />
      <HStack
        bg="secondary.400"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
      >
        {back && (
          <IconButton
            _icon={{
              color: "white",
            }}
            onPress={goBack}
            icon={<Icon name="arrow-back" as={MaterialIcons} />}
          />
        )}
        <HStack alignItems="center" flex={1}>
          <Text color="white" fontSize="20" fontWeight="bold">
            {title}
          </Text>
        </HStack>
      </HStack>
    </VStack>
  )
}
