import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { color, typography } from "../../theme"
import { Text } from "../../components"
import {MapStyles as styles} from "./map.styles"

export interface MapProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Map = function Map(props: MapProps) {
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
