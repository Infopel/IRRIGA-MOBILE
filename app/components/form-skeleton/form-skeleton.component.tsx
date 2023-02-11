import { Center, HStack, Skeleton, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { FormSkeletonStyles as styles } from "./form-skeleton.styles"

export interface FormSkeletonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormSkeleton = function FormSkeleton(props: FormSkeletonProps) {
  const { style } = props
  return (
    <Center w="100%" flex={1}>
      <VStack
        flex={1}
        w="100%"
        maxW="400"
        // borderWidth="1"
        space={8}
        overflow="hidden"
        rounded="md"
        _dark={{
          borderColor: "coolGray.500",
        }}
        _light={{
          borderColor: "coolGray.200",
        }}
        alignItems={"center"}
      >


        <VStack w="90%" flex={1}>
          <Skeleton mt="8" mb="2" h="2" />
          <Skeleton h="10" />

          <Skeleton mt="8" mb="2" h="2" />
          <Skeleton h="10" />

          <Skeleton mt="8" mb="2" h="2" />
          <Skeleton h="10" />

          <Skeleton mt="8" mb="2" h="2" />
          <Skeleton h="10" />

          <Skeleton mt="8" mb="2" h="2" />
          <Skeleton h="10" />
        </VStack>
        <HStack>
          <Skeleton w="50%" px="4" my="4" rounded="md" />
          <Skeleton px="4" w="50%" my="4" rounded="md" startColor="primary.100" />
        </HStack>
      </VStack>
    </Center>
  )
}
