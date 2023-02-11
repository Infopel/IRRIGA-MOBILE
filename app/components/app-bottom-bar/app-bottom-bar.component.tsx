import { BottomTabBarProps } from "@react-navigation/bottom-tabs"
import { HStack } from "native-base"
import * as React from "react"
import NavigationButton from "./NavigationButton"

export interface AppBottomBarProps extends BottomTabBarProps {}

/**
 * Describe your component here
 */
export const AppBottomBar = function AppBottomBar(props: AppBottomBarProps) {
  function navigate(index: number) {
    props.navigation.navigate(props.state.routeNames[index])
  }

  return (
    <HStack safeAreaTop bg="primary.600" alignItems="center" safeAreaBottom shadow={6}>
      {/* <NavigationButton
        onPress={navigate.bind(this, 0)}
        isSelected={props.state.index === 0}
        name="Inicio"
        defaultIconName="home-outline"
        selectedIconName="home"
        iconType="MaterialCommunityIcons"
      /> */}

      <NavigationButton
        onPress={navigate.bind(this, 0)}
        isSelected={props.state.index === 0}
        defaultIconName="people-outline"
        selectedIconName="people"
        name="Beneficiários"
        iconType="MaterialIcons"
      />
      <NavigationButton
        onPress={navigate.bind(this, 1)}
        isSelected={props.state.index === 1}
        name="Notificações"
        iconType="MaterialCommunityIcons"
        selectedIconName="water-pump"
        defaultIconName="water-pump"
      />
      <NavigationButton
        onPress={navigate.bind(this, 2)}
        isSelected={props.state.index === 2}
        defaultIconName="school-outline"
        selectedIconName="school"
        name="Escola da Machamba"
        iconType="MaterialCommunityIcons"
        />
      <NavigationButton
        onPress={navigate.bind(this, 3)}
        isSelected={props.state.index === 3}
        defaultIconName="notebook-edit-outline"
        selectedIconName="notebook-edit"
        name="/asdsad"
        iconType="MaterialCommunityIcons"
      />
    </HStack>
  )
}
