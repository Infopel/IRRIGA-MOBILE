import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../../components"
import { FormToolbarSkeletonStyles as styles } from "./form-toolbar-skeleton.styles"
import { HStack, Skeleton, VStack } from "native-base"

export interface FormToolbarSkeletonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormToolbarSkeleton = function FormToolbarSkeleton(props: FormToolbarSkeletonProps) {
  return (
    <Skeleton
      borderColor="coolGray.200"
      endColor="warmGray.50"
      h='100'
      w='full'
      // rounded="full"
    />
  )
}
