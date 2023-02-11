import { DateInput } from "components/date-input/date-input.component"
import {
  Actionsheet,
  Button,
  FormControl,
  IActionsheetProps,
  Input,
  Radio,
  Select
} from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"

export interface CreateFarmToolsModelProps extends IActionsheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CreateFarmToolsModel = function CreateFarmToolsModel(
  props: CreateFarmToolsModelProps,
) {
  const { style, ...rest } = props

  const [date, setDate] = React.useState<number | null>(null)

  return (
    <Actionsheet {...rest}>
      <Actionsheet.Content p={4}>
        <FormControl>
          <FormControl.Label>Insumo</FormControl.Label>
          <Select placeholder="Escolha um item">
            <Select.Item label="Fertilizante" value="ux" />
            <Select.Item label="Tractor" value="web" />
            <Select.Item label="Inseticida" value="cross" />
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label>Unidade</FormControl.Label>
          <Radio.Group name="Unit" value="ux">
            <Radio value="ux">Kilograma</Radio>
            <Radio value="web">Litro</Radio>
          </Radio.Group>
        </FormControl>
        <FormControl>
          <FormControl.Label>Quantidade</FormControl.Label>
          <Input placeholder="2"/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Data de Recepção</FormControl.Label>
          <DateInput date={date} label="25/05/2022" onChangeDate={setDate} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Observações</FormControl.Label>
          <Input numberOfLines={5} placeholder='...' textAlignVertical="top"/>
        </FormControl>
        <Button.Group pt={4}>
          <Button flex={1} onPress={props.onClose}>
            Salvar
          </Button>
          <Button flex={1} colorScheme="error" onPress={props.onClose}>
            Cancelar
          </Button>
        </Button.Group>
      </Actionsheet.Content>
    </Actionsheet>
  )
}
