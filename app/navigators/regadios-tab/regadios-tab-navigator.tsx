import React from "react"
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs"
import { RegadiosListScreen, RegadiosMapListScreen } from "../../screens"
import { Icon } from "native-base"
import { MaterialIcons } from "@expo/vector-icons"
import { AppToolbar } from "components"
import { WaterSuppliesTabNavigatorParamList} from "navigators/navigator-routes"


const Tabs = createMaterialTopTabNavigator<WaterSuppliesTabNavigatorParamList>()
export const RegadiosTabNavigator = () => {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        // header: () => <AppToolbar title="Regadios" />,
      }}
    >
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon as={MaterialIcons} color={color} name="list" size="lg" />
          ),
        }}
        name="list"
        component={RegadiosListScreen}
      />
      <Tabs.Screen
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Icon as={MaterialIcons} color={color} name="map" size="lg" />
          ),
        }}
        name="map_list"
        component={RegadiosMapListScreen}
      />
    </Tabs.Navigator>
  )
}
