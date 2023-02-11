import { Actionsheet, Button, Text, FormControl, IActionsheetProps, Input, Select } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { CreateEarningModelStyles as styles } from "./create-earning-model.styles"

export interface CreateEarningModelProps extends IActionsheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const CreateEarningModel = function CreateEarningModel(props: CreateEarningModelProps) {
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
          <FormControl.Label>Area (ha)</FormControl.Label>
          <Input placeholder="Ex: 50 000"/>
        </FormControl>
        <FormControl>
          <FormControl.Label>Rendimento</FormControl.Label>
          <Input placeholder="Ex: 200 000"/>
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
