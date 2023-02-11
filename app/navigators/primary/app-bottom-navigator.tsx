import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AppBottomBar, AppToolbar } from "components"
import { AppBottomNavigatorParamList } from "navigators/navigator-routes"
import { RegadiosTabNavigator } from "navigators/regadios-tab/regadios-tab-navigator"
import React from "react"
import {
  BeneficiariesScreen,
  DataGatheringScreen,
  FarmSchoolScreen, HomeScreen
} from "../../screens"

const Bottom = createBottomTabNavigator<AppBottomNavigatorParamList>()
export const AppBottomNavigator = () => {
  return (
    <Bottom.Navigator
      screenOptions={{
        header: ({ options: { title }, route }) => <AppToolbar title={title ?? route.key} />,
      }}
      tabBar={(props) => <AppBottomBar {...props} />}
    >
      {/* <Bottom.Screen options={{ title: "Inicio" }} name="home" component={HomeScreen} /> */}
      <Bottom.Screen
        options={{ title: "Beneficiarios" }}
        name="beneficiaries"
        component={BeneficiariesScreen}
      />
      <Bottom.Screen
        options={{ title: "Regadios" }}
        name="water-supply"
        component={RegadiosTabNavigator}
      />
      <Bottom.Screen
        options={{ title: "Escola da Machamba" }}
        name="farm-school"
        component={FarmSchoolScreen}
      />
      <Bottom.Screen
        options={{ title: "Recolha de Dados" }}
        name="data-gathering"
        component={DataGatheringScreen}
      />
    </Bottom.Navigator>
  )
}
