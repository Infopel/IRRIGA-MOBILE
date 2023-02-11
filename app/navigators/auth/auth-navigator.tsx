import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { LoginScreen } from "../../screens/login/login-screen"
import { LoginNavigatorParamList } from "navigators/navigator-routes"


const Stack = createStackNavigator<LoginNavigatorParamList>()
export const LoginNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  )
}
