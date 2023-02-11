import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons"
import { Center, Icon, Pressable } from "native-base"
import React from "react"

type TMaterialCommunityIcons = keyof typeof MaterialCommunityIcons["glyphMap"]
type TMaterialIcons = keyof typeof MaterialIcons["glyphMap"]

type NavigationButtonProps = (MaterialIconProps | MaterialCommunityIconProps) & {
  isSelected: boolean
  name: string
  onPress: () => void
}

interface MaterialIconProps {
  defaultIconName: TMaterialIcons
  selectedIconName: TMaterialIcons
  iconType: "MaterialIcons"
}

interface MaterialCommunityIconProps {
  defaultIconName: TMaterialCommunityIcons
  selectedIconName: TMaterialCommunityIcons
  iconType: "MaterialCommunityIcons"
}

const NavigationButton: React.FunctionComponent<NavigationButtonProps> = ({
  defaultIconName,
  selectedIconName,
  onPress,
  name,
  iconType,
  isSelected,
}) => {
  function icon() {
    if (iconType === "MaterialIcons") {
      //@ts-ignore
      return <MaterialIcons name={isSelected ? selectedIconName : defaultIconName} />
    } else if (iconType === "MaterialCommunityIcons") {
      //@ts-ignore
      return <MaterialCommunityIcons name={isSelected ? selectedIconName : defaultIconName} />
    }
  }
  return (
    <Pressable opacity={isSelected ? 1 : 0.5} py="2" flex={1} onPress={onPress}>
      <Center>
        <Icon mb="1" as={icon()} color="white" size="5xl" />
        {/* <Text textAlign={"center"} color="white" numberOfLines={1}>
          {name}
        </Text> */}
      </Center>
    </Pressable>
  )
}

export default NavigationButton
