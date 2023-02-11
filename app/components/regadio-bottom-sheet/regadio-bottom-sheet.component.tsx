import { MaterialIcons } from "@expo/vector-icons"
import { Database } from "@nozbe/watermelondb"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { Actionsheet, Heading, HStack, Icon, IconButton, ScrollView, Text, VStack } from "native-base"
import { navigate } from "navigators/navigation-utilities"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { findWaterSupplyById, WaterSupply } from "storage/queries/water-supplies"
import { DateUtils } from "utils"

export interface RegadioBottomSheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  item: WaterSupply
  itemId: string
  isVisible?: boolean
  onClose: () => void
}
const _text = { color: 'primary.600', fontWeight: 'bold' }

/**
 * Describe your component here
 */
const _RegadioBottomSheet = function RegadioBottomSheet({
  isVisible,
  onClose,
  item,
}: RegadioBottomSheetProps) {
  const handleNavigateToForm = (
    form: "water_supply_intensification" | "water_supply_constuction_fiscalization",
  ) =>
    navigate("form", {
      formId: form,
      loadPrevious: false,
    })
  return (
    <Actionsheet
      accessibilityRole="summary"
      accessibilityState={{ expanded: isVisible }}
      isOpen={isVisible}
      onClose={onClose}
    >
      <Actionsheet.Content alignItems={"flex-start"} px={["8", "16"]}>
        <ScrollView width={"full"}>
          <VStack w='full' mx='2'>
            <HStack my='4' alignItems={'center'}>
              <Heading color="black" flex={1} textAlign={"left"}>
                {item?.name}
              </Heading>
              <IconButton
                colorScheme={'text'}
                icon={<Icon name='open-in-new' as={MaterialIcons} />}
                variant={"ghost"}
                onPress={navigate.bind(this, "water_supply_view", { waterSupply: item.id })}
              />
            </HStack>
            {/* •	Nome do regadio;
•	Localização, Povoado, Localidade, PA e Distrito (Incluir coordenadas)
•	Área do Regadio;
•	Beneficiários Homens;
•	Beneficiários Mulheres;
•	Entidade da Empreitada;
•	Pessoa de contacto da Contratada (nome, telefone);
•	Entidade fiscalização;
•	Pessoa de contacto da Fiscalização (nome, telefone);
•	Prazo da obra;
•	Data da Consignação;
•	Data de início da Obra;
•	Data de término da obra;
•	Data da Entrega Provisória;
•	Fase corrente;
•	Execução física prevista (em %)
•	Execução física corrente (em %);
•	Data da última monitoria; */}


            <Text mt={4} textAlign={"left"}>
              Endereço
            </Text>
            <Heading mt={2} textAlign={"left"} size={"md"}>
              {item?.address ?? " _"}
            </Heading>
            <Text mt={4} textAlign={"left"}>
              Área
            </Text>
            <Heading mt={2} textAlign={"left"} size={"md"}>
              {item?.area ?? " _"}
            </Heading>
            <Text mt={4} textAlign={"left"}>
              Beneficiários
            </Text>
            <Heading mt={2} textAlign={"left"} size={"md"}>
              {item?.totalBeneficiaries ?? " _"}
            </Heading>
            <Text mt={4} textAlign={"left"}>
              Data da última monitoria
            </Text>
            <Heading mt={2} textAlign={"left"} size={"md"}>
              {item?.lastMonitoredAt ? DateUtils.formatToShortDate(item?.lastMonitoredAt) : "  -"}
            </Heading>
            <Text mt={4} textAlign={"left"}>
              Execução física
            </Text>
            <Heading mt={2} textAlign={"left"} size={"md"}>
              {item?.currentExecution ? item.currentExecution + " %" : "   _   "}
            </Heading>


          </VStack>
          <Actionsheet.Item {...{ _text }} >
            Carregar fotos
          </Actionsheet.Item>
          <Actionsheet.Item {...{ _text }}
            onPress={handleNavigateToForm.bind(this, "water_supply_intensification")}
          >
            Intensificação de regadios
          </Actionsheet.Item>
          <Actionsheet.Item {...{ _text }}
            onPress={handleNavigateToForm.bind(this, "water_supply_constuction_fiscalization")}
          >
            Monitoria Física
          </Actionsheet.Item>
          <Actionsheet.Item {...{ _text }}
            onPress={navigate.bind(this, "form", { formId: 'social_safe_guard_monitoring', loadPrevious: false })}
          >
            Salvaguardas sociais
          </Actionsheet.Item>
          <Actionsheet.Item {...{ _text }}
            onPress={navigate.bind(this, "form", { formId: 'enviromental_safe_guard_monitoring', loadPrevious: false })}
          >
            Salvaguardas ambientais
          </Actionsheet.Item>
          <Actionsheet.Item {...{ _text }} onPress={()=>navigate( "form", { formId: "register_adenda_and_contingencies" })}>
            Cadastrar  Adenda e Contingência
          </Actionsheet.Item>

        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export const RegadioBottomSheet = withDatabase(
  withObservables(
    ["database", "itemId"],
    ({ database, itemId }: { database: Database; itemId: string }) => ({
      item: findWaterSupplyById(database, itemId),
    }),
  )(_RegadioBottomSheet),
)
