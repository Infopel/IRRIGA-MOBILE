import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { AppToolbar, Screen } from "../../components"
import { NavigatorParamList } from "../../navigators"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { Database } from "@nozbe/watermelondb"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { Heading, Text, VStack } from "native-base"
import { findWaterSupplyById, WaterSupply } from "storage/queries/water-supplies"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `regadioView: undefined` to NavigatorParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="regadioView" component={RegadioViewScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

interface RegadioScreenProps extends StackScreenProps<NavigatorParamList, "regadio_view"> {
  regadio: WaterSupply
}
const _RegadioViewScreen: FC<RegadioScreenProps> = observer(function (props) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  //@ts-ignore
  const item: WaterSupply = props.regadio
  return (
    <VStack flex={1}>
      <AppToolbar title={item?.name} />
      <Screen flex={1} preset="scroll">
        <Text mt={4} textAlign={"left"}>
          Endereço
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.address}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Área
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.area}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Beneficiários Homens
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.maleBeneficiaries}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Beneficiários Mulheres
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.femaleBeneficiaries}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Entidade da Empreitada
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.entityName}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Pessoa de contacto da Contratada
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.hiredContactName} - {item?.hiredContactTelephone}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Pessoa de contacto da Fiscalização
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.fiscalContactName} - {item?.fiscalContactTelephone}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Prazo da obra
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.timeFrame}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Data da Consignação
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.coSignedAt}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Data de início da Obra
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.beginAt}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Data de término da obra
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.deliveryAt}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Data da Entrega Provisória
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.temporaryDeleveryAt}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Fase corrente
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.currentFase}
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Execução física prevista
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.expecteExcecution} %
        </Heading>
        <Text mt={4} textAlign={"left"}>
          Execução física corrente
        </Text>
        <Heading mt={2} textAlign={"left"} size={"md"}>
          {item?.currentExecution} %
        </Heading>
      </Screen>
    </VStack>
  )
})

export const RegadioViewScreen = withDatabase(
  withObservables(
    ["database", "route"],
    ({ database, route }: { database: Database; route: any }) => {
     
      return {
        regadio: findWaterSupplyById(database, route.params.waterSupply),
      }
    },
  )(_RegadioViewScreen),
)
