import { MaterialIcons } from "@expo/vector-icons"
import { observer } from "mobx-react-lite"
import { Box, Heading, HStack, Icon, IconButton, Pressable, StatusBar, Text, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { goBack } from "navigators"
import { FormToolbarStyles as styles } from "./form-toolbar.styles"

export interface FormToolbarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  totalPages: number
  pageTitle: string
  pageNumber: number
  error?:string
  changePage: (page: number) => void
}

/**
 * Describe your component here
 */
export const FormToolbar = observer(function (props: FormToolbarProps) {
  const { style, changePage, totalPages, pageTitle, pageNumber, error } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  const listOfNumbers = React.useCallback(() => {
    const list: number[] = []
    if (!totalPages) return list
    for (let i = 0; i < totalPages; i++) {
      list[i] = 1 + i
    }
    return list
  }, [])

  return (
    <VStack>
      <StatusBar />
      <HStack alignItems={"flex-start"} style={containerStyle} bg="secondary.400" space={2}>
        <IconButton
          _icon={{
            color: "white",
            size: "md",
          }}
          p={"1"}
          onPress={goBack}
          icon={<Icon as={MaterialIcons} name="arrow-back" />}
        />
        {/* <Box
          borderRadius="full"
          borderColor="white"
          _text={{
            color: "white",
            fontWeight: "bold",
            fontSize: "20",
          }}
          justifyContent="center"
          borderWidth={3}
          px={5}
        >
          {pageInfo?.pageNumber}
        </Box> */}
        <VStack space={2}>
          <Heading size={"md"} color={"white"}>
            {pageTitle}
          </Heading>
          <HStack>
            {listOfNumbers().map((i) => (
              <Pressable key={i} onPress={changePage.bind(this, i - 1)}>
                <Box
                  borderRadius="full"
                  bg={pageNumber === i ? "white" : "secondary.100"}
                  p={2}
                  mx="1"
                />
              </Pressable>
            ))}
          </HStack>
        </VStack>
      </HStack>
      {error && (
        <HStack
          _light={{
            bg: "light.200",
          }}
          _dark={{
            bg: "dark.200",
          }}
          p={2}
          justifyContent={"center"}
          w="full"
        >
          <Text color="danger.500" textAlign={"center"}>
            {error}
          </Text>
        </HStack>
      )}
    </VStack>
  )
})
