import { Actionsheet, Button, FormControl, IActionsheetProps, Input, Select } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { Text } from "components"
import { CreateComerceModelStyles as styles } from "./create-comerce-model.styles"

export interface CreateComerceModelProps extends IActionsheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CreateComerceModel = function CreateComerceModel(props: CreateComerceModelProps) {
  const { style, ...rest } = props

  return (
    <Actionsheet {...rest}>
      <Actionsheet.Content p={4}>
        <FormControl>
          <FormControl.Label>Cultura</FormControl.Label>
          <Select>
            <Select.Item label="Tomate" value="ux" />
            <Select.Item label="Cebola" value="web" />
            <Select.Item label="Repolho" value="cross" />
            <Select.Item label="Batata" value="ui" />
            <Select.Item label="Arroz" value="backend" />
          </Select>
        </FormControl>
        <FormControl>
          <FormControl.Label>Peso</FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label>Preco</FormControl.Label>
          <Input />
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
