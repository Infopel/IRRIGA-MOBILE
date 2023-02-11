import { KeyboardAvoidingView, ScrollView, StatusBar, useColorMode, View } from "native-base"
import * as React from "react"
import { Platform } from "react-native"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import { ScreenProps } from "./screen.props"

const isIos = Platform.OS === "ios"

function ScreenWithoutScrolling(props: ScreenProps) {
  const { keyboardOffset, style, children, ...rest } = props
  const color = useColorMode()
  return (
    <KeyboardAvoidingView
      {...rest}
      px={3}
      _light={{
        bg: "light.100",
      }}
      _dark={{
        bg: "dark.100",
      }}
      h="full"
      flex={1}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[keyboardOffset || "none"]}
    >
      <StatusBar/>
      <View justifyContent="flex-start" alignItems="stretch" height="100%" width="100%" flex={1}>
        {children}
      </View>
    </KeyboardAvoidingView>
  )
}

function ScreenWithScrolling(props: ScreenProps) {
  const { keyboardOffset, style, children, keyboardShouldPersistTaps, ...rest } = props
  const color = useColorMode()

  const preset = presets.scroll
  const innerStyle = style || {}

  return (
    <KeyboardAvoidingView
      {...rest}
      px={3}
      _light={{
        bg: "light.100",
      }}
      _dark={{
        bg: "dark.100",
      }}
      h="full"
      flex={1}
      behavior={isIos ? "padding" : undefined}
      keyboardVerticalOffset={offsets[keyboardOffset || "none"]}
    >
      <StatusBar/>

      <ScrollView
        flex={1}
        _contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "stretch",
        }}
        contentContainerStyle={[preset.inner, innerStyle]}
        keyboardShouldPersistTaps={keyboardShouldPersistTaps || "handled"}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
  if (isNonScrolling(props.preset)) {
    return <ScreenWithoutScrolling {...props} />
  } else {
    return <ScreenWithScrolling {...props} />
  }
}
