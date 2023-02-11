import { HStack, IBoxProps } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import ChipItem from "./Chips.Item.component"

export type Item = {
  id: string
  name: string
}

interface BaseChipsProps extends IBoxProps {
  /**
   * An optional style override useful for padding & margin.
   */
  items: Item[]
  size?: "sm" | "md"
}

interface ActionChipsProps extends BaseChipsProps {
  onAction?: () => void
  hideActionBtn?: boolean
  onItemClick?: (item: string, action: "delete" | "press") => void
}
interface SelectableChipsProps extends BaseChipsProps {
  selectedItems: string[]
  onSelectItems: (selectedItem: string | null, items: string[]) => void
}
export type ChipsProps = SelectableChipsProps | ActionChipsProps

function isActionChips(args: ChipsProps): args is ActionChipsProps {
  return (args as ActionChipsProps).onAction !== undefined
}
function isSelectableChips(args: ChipsProps): args is SelectableChipsProps {
  return (
    (args as SelectableChipsProps).onSelectItems !== undefined &&
    (args as SelectableChipsProps).selectedItems !== undefined
  )
}

/**
 * Describe your component here
 */
export const Chips = (props: ChipsProps) => {
  //@ts-ignore
  const { items, size, onChangeItems: oc, selectedItems: si, onAction: ao, hideActionBtn: ha, onItemClick: oi, ...rest } = props

  const onChangeItems = isSelectableChips(props) ? props.onSelectItems : undefined
  const selectedItems = isSelectableChips(props) ? props.selectedItems : undefined
  const onAction = isActionChips(props) ? props.onAction : undefined
  const hideActionButton = isActionChips(props) ? props.hideActionBtn : false
  const onItemClick = isActionChips(props) ? props.onItemClick : undefined

  const _isDeletable = onItemClick || onChangeItems
  const _isSelectable = onItemClick || onChangeItems

  const handleOnSelectItem = (itemId: string) => {
    if (!isSelectableChips(props)) {
      onItemClick?.(itemId, "press")
      return
    }

    const _selectedItems = selectedItems ?? []
    onChangeItems?.call(this, itemId, [..._selectedItems, itemId + ""])
  }
  const handleOnDelete = (itemId: string) => {
    if (isSelectableChips(props)) {
      onChangeItems?.call(this, null, selectedItems?.filter((id) => id !== itemId) ?? [])
    } else {
      onItemClick?.(itemId, "delete")
    }
  }

  const visisbleItems =
    items?.map((item) =>
      selectedItems?.find((i) => i === item.id)
        ? { ...item, isSelected: true }
        : { ...item, isSelected: false },
    ) ?? []

  return (
    <HStack {...rest} flexWrap="wrap">
      {visisbleItems.map(({ id, name, isSelected }) => (
        <ChipItem
          key={id}
          size={size}
          status={isSelected ? "selected" : "none"}
          onDeletePressed={!_isDeletable ? undefined : handleOnDelete.bind(this, id + "")}
          onPress={!_isSelectable ? undefined : handleOnSelectItem.bind(this, id + "")}
        >
          {name}
        </ChipItem>
      ))}
      {onAction && !hideActionButton && (
        <ChipItem
          size={size}
          status={visisbleItems.length <= 0 ? "action" : "edit"}
          onPress={onAction}
        >
          {visisbleItems.length === 0 ? "Adicionar" : "Alterar"}
        </ChipItem>
      )}
    </HStack>
  )
}
