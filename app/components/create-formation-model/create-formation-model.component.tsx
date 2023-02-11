import { Actionsheet, Button, FormControl, Heading, IActionsheetProps,Text, Input, ScrollView, Select } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { DateInput } from "components/date-input/date-input.component"
import { CreateFormationModelStyles as styles } from "./create-formation-model.styles"

export interface CreateFormationModelProps extends IActionsheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CreateFormationModel = function CreateFormationModel(
  props: CreateFormationModelProps,
) {
  const { style, ...rest } = props
  const [startDate, setStartDate] = React.useState<number | null>(null)
  const [endDate, setEndDate] = React.useState<number | null>(null)
  return (
    <Actionsheet {...rest}>
      <Actionsheet.Content p={4}>
        <Heading pb='2' size='md'>Criar Formação</Heading>
        <ScrollView width={'full'}>
        <FormControl>
          <FormControl.Label>Categoria</FormControl.Label>
          <Select placeholder="Escolha uma categoria">
            <Select.Item label="Produção" value="ux" />
            <Select.Item label="Comercialização" value="web" />
            <Select.Item label="Gestão de Regadios" value="cross" />
            <Select.Item label="Salvaguardas" value="ui" />
            <Select.Item label="EMC" value="backend" />
            <Select.Item label="PITTA" value="ds" />
            <Select.Item label="Vitrina tecnologica" value="sds" />
            <Select.Item label="Irrigação" value="d2" />
            <Select.Item label="CDR" value="fr" />
            <Select.Item label="Outra" value="gt" />
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label>Outra Categoria</FormControl.Label>
          <Input placeholder="Outra ..." />
        </FormControl>
        <FormControl>
          <FormControl.Label>Regadio</FormControl.Label>
          <Select placeholder="Escolha um Regadio">
            <Select.Item label="Agua Santa" value="ux" />
            <Select.Item label="Moambe" value="web" />
            <Select.Item label="António e Filhos" value="cross" />
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label>Associação</FormControl.Label>
          <Select placeholder="Escolha uma Associação">
            <Select.Item label="Moiane" value="ux" />
            <Select.Item label="Moambe" value="web" />
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label>Designação</FormControl.Label>
          <Input placeholder="Ex: 200 000" />
        </FormControl>
        <FormControl>
          <FormControl.Label>Data de Inicio</FormControl.Label>
          <DateInput label="20/12/2022" date={startDate} onChangeDate={setStartDate} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Data de Fim</FormControl.Label>
          <DateInput label="20/12/2022" date={endDate} onChangeDate={setEndDate} />
        </FormControl>
        <Button.Group pt={4}>
          <Button flex={1} onPress={props.onClose}>
            Salvar
          </Button>
          <Button flex={1} colorScheme="error" onPress={props.onClose}>
            Cancelar
          </Button>
        </Button.Group>
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  )
}
