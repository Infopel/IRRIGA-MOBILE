import { MaterialIcons } from "@expo/vector-icons"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { Actionsheet, Heading, HStack, Icon, IconButton, ScrollView, Text, VStack } from "native-base"
import { navigate } from "navigators"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { findBeneficiariesDetailsById, IBeneficiary } from "storage"

export interface BeneficiaryInfoBottomSheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
  item: IBeneficiary
  beneficiaryId: string
  onClose: () => void
}

/**
 * Describe your component here
 */
const _text = { color: 'primary.600', fontWeight: 'bold' }
function BottomSheet(
  props: BeneficiaryInfoBottomSheetProps,
) {
  const { style, isVisible, item, onClose } = props


  return (
    <Actionsheet isOpen={isVisible} onClose={onClose}>
      <Actionsheet.Content alignItems={"flex-start"}>
        <ScrollView w='full'>
          <VStack mx='2'>
            <HStack my='4' alignItems={'center'}>
              <Heading color="black" flex={1} textAlign={"left"}>
                {item?.name}
              </Heading>
              <IconButton
                colorScheme={'text'}
                icon={<Icon name='open-in-new' as={MaterialIcons} />}
                variant={"ghost"}
                onPress={() => navigate("form_responses", {
                  formId: "beneficiary",
                  quizId: item?.id,
                })}
              />
            </HStack>

            <Text mt={4} textAlign={"left"}>
              Endereço
            </Text>
            <Heading mt={2} textAlign={"left"} size={"md"}>
              {item?.address ?? "   -"}
            </Heading>
            <Text mt={4} textAlign={"left"}>
              Associação
            </Text>
            <Heading mt={2} textAlign={"left"} size={"md"}>
              {item.association ?? "   -"}
            </Heading>
            <Text mt={4} textAlign={"left"}>
              Regadio
            </Text>
            <Heading mt={2} textAlign={"left"} size={"md"}>
              {item.waterSupply ?? "   -"}
            </Heading>
          </VStack>
          <Actionsheet.Item {...{ _text }} onPress={navigate.bind(this, "comerce", undefined)}>Comercios</Actionsheet.Item>
          <Actionsheet.Item {...{ _text }} onPress={navigate.bind(this, "formations", undefined)}>Formações</Actionsheet.Item>
          <Actionsheet.Item {...{ _text }} onPress={navigate.bind(this, "earnings", undefined)}>Rendimentos</Actionsheet.Item>
          <Actionsheet.Item {...{ _text }} onPress={navigate.bind(this, "farm_tools", undefined)}>Insumos</Actionsheet.Item>
          <Actionsheet.Item {...{ _text }} onPress={navigate.bind(this, "form", { formId: "satisfaction_evaluation", loadPrevious: false })}>
            Preencher Inquérito de Satisfação
          </Actionsheet.Item>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  )
}


export const BeneficiaryInfoBottomSheet = withDatabase(withObservables(["database", "beneficiaryId"], ({ database, beneficiaryId }) => ({ item: findBeneficiariesDetailsById(database, beneficiaryId) }))(BottomSheet))