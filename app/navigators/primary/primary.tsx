import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { FormToolbarContainer } from "containers/form-toolbar"
import { BeneficiariesNavigatorParamList as PrimaryNavigatorParamList } from "navigators/navigator-routes"
import React from "react"
import {
  ComerceScreen,
  EarningsScreen,
  FarmSchoolScreen,
  FarmToolsScreen,
  FormationsScreen,
  FormationViewScreen,
  FormResponseScreen,
  FormScreen,
  RegadioViewScreen,
} from "../../screens"
import { AppBottomNavigator } from "./app-bottom-navigator"

const Stack = createNativeStackNavigator<PrimaryNavigatorParamList>()

export const PrimaryNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="bottom">
      <Stack.Screen name="bottom" component={AppBottomNavigator} />
      <Stack.Screen name="comerce" component={ComerceScreen} />
      <Stack.Screen name="earnings" component={EarningsScreen} />
      <Stack.Screen name="formations" component={FormationsScreen} />
      <Stack.Screen name="farm_school" component={FarmSchoolScreen} />
      <Stack.Screen name="farm_tools" component={FarmToolsScreen} />
      <Stack.Screen
        name="form"
        component={FormScreen}
        options={{ header: () => <FormToolbarContainer />, headerShown: true }}
      />
      <Stack.Screen name="formation_view" component={FormationViewScreen} />
      <Stack.Screen name="form_responses" component={FormResponseScreen} />
      <Stack.Screen name="water_supply_view" component={RegadioViewScreen} />
    </Stack.Navigator>
  )
}
