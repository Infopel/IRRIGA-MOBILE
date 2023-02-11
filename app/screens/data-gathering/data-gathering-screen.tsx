import { StackScreenProps } from "@react-navigation/stack"
import { Screen } from "components"
import { observer } from "mobx-react-lite"
import { navigate, NavigatorParamList } from "navigators"
import React, { FC } from "react"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "models"
import { FormType } from "api"
import { Button, Divider, FlatList, Heading } from "native-base"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `dataGathering: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="dataGathering" component={DataGatheringScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
const forms = new Map<string, FormType>()
forms.set("Monitoria da Escola Machamba", "farm_school_monitoring")
forms.set("Cadastro de Regadio", "water_supply")
forms.set("Monitoria dos Rendimentos Agrícolas", "agro_income_monitoring")
forms.set("Monitoria da Comercialização Agrícola", "agro_commerce_monitoring")
forms.set("Cadastro de Escolas da Machamba do camponês", "farm_school_register")
forms.set("Monitoria de Construção de Regadios", "water_supply_contruction_monitoring")
// forms.set("Formulário Fiscalização de Construção de Regadios", "water_supply_constuction_fiscalization")
forms.set("Inquérito de avaliação de satisfação", "satisfaction_evaluation")
forms.set("Formulario de Distribuição de Insumos", "farm_tools_distribuition")
forms.set("Formulário de Formação", "formation")
forms.set("Cadastro de Beneficiário", "beneficiary")
forms.set("Formulário de Intensificação de Regadios", "water_supply_intensification")
forms.set("Monitoria de Indicadores Salvaguarda Social", "social_safe_guard_monitoring")
forms.set("Monitoria de Indicadores Salvaguarda Ambiental", "enviromental_safe_guard_monitoring")
forms.set("Cadastro de Eventos (Contingência e Adenda)", "register_adenda_and_contingencies")

export const DataGatheringScreen: FC<
  StackScreenProps<NavigatorParamList, "data_gathering">
> = observer(function DataGatheringScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()

  return (
    <Screen preset="fixed">
      <Heading size={["lg"]} fontSize={24} my="3">
        Formulários
      </Heading>

      <FlatList
        h='full'
        w="full"
        data={Array.from(forms.entries()).sort((a, b) =>
          a[0].localeCompare(b[0])
        )}
        keyExtractor={(item)=> item[1]}
        ItemSeparatorComponent={() => <Divider />}
        renderItem={({ item }) => (
          <Button
            w="full"
            variant={"ghost"}
            justifyContent="flex-start"
            textAlign="start"
            py='2'
            // _text={{ alignItems: "flex-start", bg: "blueGray.100", textAlign: "left" }}
            onPress={navigate.bind(this, "form", { formId: item[1] })}
          >
            {item[0]}
          </Button>
        )}
      />


    </Screen>
  )
})
