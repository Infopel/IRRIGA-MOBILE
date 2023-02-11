import { Chips } from "components/chips/chips.component";
import { isNil } from "lodash";

import {
  Actionsheet,
  AlertDialog,
  Button,
  Checkbox,
  Heading, ScrollView,
  Text,
  VStack
} from "native-base";
import React from "react";

export type Option = { id: string; name: string }

interface DropDownProps {
  label: string
  isVisible: boolean
  options?: Option[]
  onChangeSelectedItems: (selectedItem: string | number | null, items: string[]) => void
  selectedItems?: string[]
  toggleClose: () => void
  isSetChangeOnComplete?: boolean
}

export const DropdownList: React.FunctionComponent<DropDownProps> = ({
  isVisible,
  options,
  label,
  selectedItems: _selectedItems,
  onChangeSelectedItems,
  toggleClose,
  isSetChangeOnComplete = false,
}) => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([])
  const handleOnPress = (id: string) => {
    setSelectedItems((prev) => {
      let items = [...prev]
      if (items.find((i) => id === i)) {
        items = items.filter((i, index, array) => {
          const dontExists = id != i
          return dontExists
        })
      } else {
        items = [...items, id]
      }
      if (isSetChangeOnComplete) {
        return items
      } else {
        onChangeSelectedItems(id, items)
        return prev
      }
    })

  }

  React.useEffect(() => {
    setSelectedItems(_selectedItems ?? [])
  }, [_selectedItems?.length])

  const allItemsByStatus = options?.map((op) =>
    selectedItems?.find((s) => s === op.id)
      ? { ...op, isSelected: true }
      : { ...op, isSelected: false },
  )

  const updateAndCloseDialog = () => {
    onChangeSelectedItems(null, selectedItems)
    toggleClose()
  }

  const cancelAndClose = () => {
    setSelectedItems(_selectedItems ?? [])
    toggleClose()
  }

  const handleOnChangeChipsSelectedItems = (i: string | null, items: string[]) => {
    setSelectedItems(items)
  }

  const itemsFilteredBySelected = allItemsByStatus?.filter((s) => s.isSelected) ?? []

  return (
    <Actionsheet isOpen={isVisible} accessibilityState={{ expanded: isVisible }} onClose={cancelAndClose}>
      <Actionsheet.Content>
        <AlertDialog.CloseButton onPress={toggleClose} accessibilityLabel='close' />
        <VStack w="100%" px={4} justifyContent="center">
          <Heading mb={"5"} size="md">
            {label}
          </Heading>
          <Chips
            items={itemsFilteredBySelected}
            selectedItems={selectedItems ?? []}
            onSelectItems={handleOnChangeChipsSelectedItems}
          />
        </VStack>
        <ScrollView w={["full", "xl"]}>
          {
            isNil(allItemsByStatus) || allItemsByStatus?.length === 0 ? <Text mb='4' ml='2'>Lista Vazia</Text> : allItemsByStatus.map(({ id, name, isSelected }) => (
              <Actionsheet.Item key={id} accessibilityLabel={`dropdown-item-${name}`} onPress={handleOnPress.bind(this, id)}>
                <Checkbox isChecked={isSelected} value={id} onChange={handleOnPress.bind(this, id)}>
                  {name}
                </Checkbox>
              </Actionsheet.Item>
            ))}
        </ScrollView>
        {isSetChangeOnComplete && (
          <Button.Group mb={4} justifyContent="flex-end" width={"full"}>
            <Button flex={1} accessibilityLabel='cancel' colorScheme="danger" onPress={cancelAndClose}>
              Cancelar
            </Button>
            <Button flex={1} accessibilityLabel='save' onPress={updateAndCloseDialog}>
              Salvar
            </Button>
          </Button.Group>
        )}
      </Actionsheet.Content>
    </Actionsheet>
  )
}
