import { Chips, DropdownList } from "components"
import { intersectionWith } from "lodash"
import { Box, Button, IActionsheetProps, useDisclose, View } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"

export interface AddFormationParticipantsModelProps extends IActionsheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  participants: { id: string; name: string }[]
}

/**
 * Describe your component here
 */
export const AddFormationParticipantsModel = function AddFormationParticipantsModel(
  props: AddFormationParticipantsModelProps,
) {
  const { style, participants, ...rest } = props
  const { isOpen, onToggle } = useDisclose()

  const [selectedItems, setSelectedItems] = React.useState<string[]>([])

  const handleOnSelectedItems = (selectedItem: number | string | null, itemIds: string[]) => {
    setSelectedItems(itemIds)
  }

  const selectedChips = intersectionWith(
    participants,
    selectedItems ?? [],
    (item, id) => item.id == id,
  )

  return (
    <Box mb={4} testID="formMultiSelectContainer">
      {/* <Chips items={selectedChips} onAction={onToggle} /> */}
      <Button onPress={onToggle}>Adicionar</Button>
      <DropdownList
        label={"Adicionar Participantes"}
        isVisible={isOpen}
        options={participants}
        toggleClose={onToggle}
        selectedItems={selectedItems}
        onChangeSelectedItems={handleOnSelectedItems}
        isSetChangeOnComplete={true}
      />
    </Box>
  )
}
