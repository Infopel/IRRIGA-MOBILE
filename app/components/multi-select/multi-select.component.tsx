import { Chips } from "components/chips/chips.component"
import { DropdownList, Option } from "components/dropdown-list/dropdown-list.component"
import { Box, Center, ChevronDownIcon, CloseIcon, HStack, IBoxProps, Pressable, Text, useDisclose, usePropsResolution } from "native-base"
import * as React from "react"

export interface MultiSelectProps extends IBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  selectedItems: Option[]
  options: Option[]
  label: string
  onSelectItems: (selectedItem: number | string | null, itemIds: string[]) => void
}

/**
 * Describe your component here
 */
export const MultiSelect = (props: MultiSelectProps) => {
  const { label, selectedItems, onSelectItems, options, ...rest } = props

  const { isOpen, onToggle } = useDisclose()

  const { customDropdownIconProps } = usePropsResolution("Select", {}, { isFocused: isOpen })
  const { ...resolvedProps } = usePropsResolution("Input", {})
  const rightIcon = isOpen ? (
    <CloseIcon {...customDropdownIconProps} />
  ) : (
    <ChevronDownIcon {...customDropdownIconProps} />
  )

  const isSelectedItems = selectedItems.length > 0

  return (
    <Box {...rest}>
      <Pressable onPress={onToggle}>
        <HStack {...resolvedProps} paddingRight={0} paddingLeft={isSelectedItems ? 1 : 3}>
          <Box flex={1}>
            {!isSelectedItems ? (
              <Text py='2'
                fontFamily={resolvedProps.fontFamily}
                fontSize={resolvedProps.fontSize}
                color={resolvedProps.placeholderTextColor}
              >
                {label}
              </Text>
            ) : (
              <Chips size="sm" hideActionBtn items={selectedItems} onAction={onToggle} />
            )}
          </Box>
          <Center>{rightIcon}</Center>
        </HStack>
      </Pressable>
      <DropdownList
        label={label}
        isVisible={isOpen}
        options={options ?? []}
        toggleClose={onToggle}
        selectedItems={selectedItems.map(({ id }) => id)}
        onChangeSelectedItems={onSelectItems}
        isSetChangeOnComplete
      />
    </Box>
  )
}
