import { NavigationProp, RouteProp } from "@react-navigation/native"
import { FormType } from "api"

export type LoginNavigatorParamList = {
  login: undefined
}

export type BeneficiariesNavigatorParamList = {
  bottom: undefined

  comerce: undefined
  farm_school: undefined
  earnings: undefined
  form: { formId: FormType } | { loadPrevious: boolean }
  form_responses: { formId: FormType; quizId: string }
  formations: undefined
  farm_tools: undefined
  camera: { qrcode: true }
  water_supply_view: { waterSupply: string }
  formation_view: { id: string; name: string }
}


export type AppBottomNavigatorParamList = {
  home: undefined
  "water-supply": undefined
  beneficiaries: undefined
  "farm-school": undefined
  "data-gathering": undefined
}

export type BottomNavigatorParamList = {
  dashboard: undefined
  data_gathering: undefined
  notifications: undefined
  associations: undefined
}

export type WaterSuppliesTabNavigatorParamList = {
  list: undefined
  map_list: { waterSupply: string }
}
export type ScreenNavigationProps<T extends keyof NavigatorParamList> = {
  navigation: NavigationProp<NavigatorParamList, T>
  route: RouteProp<NavigatorParamList, T>
}

export type AppNavigatorParamList = {
  auth: undefined
  primary: undefined

  // 🔥 Your screens go here
}
export type NavigatorParamList = AppBottomNavigatorParamList & (BeneficiariesNavigatorParamList & BottomNavigatorParamList) &
  WaterSuppliesTabNavigatorParamList
