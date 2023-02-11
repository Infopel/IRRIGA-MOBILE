import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "components"
import {BeneficiaryInfoStyles as styles} from "./beneficiary-info.styles"

export interface BeneficiaryInfoProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const BeneficiaryInfo = function BeneficiaryInfo(props: BeneficiaryInfoProps) {
  const { style } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  return (
    <View style={containerStyle}>
      <Text style={styles.text}>Hello</Text>
    </View>
  )
}
