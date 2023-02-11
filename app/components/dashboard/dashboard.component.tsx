import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "components"
import {DashboardStyles as styles} from "./dashboard.styles"

export interface DashboardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Dashboard = function Dashboard(props: DashboardProps) {
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
