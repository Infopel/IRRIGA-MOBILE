import { MaterialIcons } from "@expo/vector-icons"
import { HStack, Icon, IconButton, Pressable, Text } from "native-base"
import * as React from "react"
import logger from "utils/logger"
interface ChipItemProps {
  children: string
  onDeletePressed?: () => void
  onPress?: () => void
  size?: "sm" | "md"
  status?: "selected" | "action" | "none" | "edit"
}

const ChipItem: React.FunctionComponent<ChipItemProps> = ({
  children,
  onPress,
  status,
  size = "md",
  onDeletePressed,
}) => {
  const _size = {
    md: {
      pressable: {
        py: 2,
        mr: 1,
        pr: 1,
        mb: 1,
      },
      text: { fontSize: "sm" },
      hStack: {
        pr: 4,
      },
    },
    sm: {
      pressable: {
        py: 1,
        mr: 1,
        pr: 1,
        mb: 1,
      },
      text: {
        fontSize: "xs",
      },
      hStack: {
        pr: 2,
      },
    },
  }

  const currentSize = _size[size]

  const isSelected = status === "selected"
  const isAction = status === "action" || status === "edit"

  return (
    <Pressable
      borderRadius={"3xl"}
      {...currentSize.pressable}
      bg={isSelected ? "primary.400" : isAction ? "primary.400" : "tertiary.100"}
      _pressed={{
        bg: "blueGray.400",
      }}
      accessibilityLabel={isAction ? `${status}-chip` : `chip-item-${children}`}
      accessibilityState={{ selected: isSelected }}
      disabled={!onPress}
      onPress={onPress}
    >
      {({ isFocused, isHovered, isPressed }) => (
        <HStack alignItems={"center"} pl={isAction ? 2 : 4} space={2} {...currentSize.hStack}>
          {isAction && (<IconButton
            m='0' p='0' variant={'ghost'}
            accessibilityLabel={`action-${children}`}
            onPress={onPress}
            color={"white"}
            icon={<Icon
              as={MaterialIcons}
              name={status !== "action" ? "edit" : "add-circle"}
              size={"sm"}
            />}
          />
          )}
          <Text
            {...currentSize.text}
            color={isPressed || isSelected || isAction ? "white" : "primary.900"}
          >
            {children}
          </Text>
          {onDeletePressed && (<IconButton m='0' p='0'
            accessibilityLabel={`delete-${children}`}
            onPress={onDeletePressed}
            color={isPressed || isSelected || isAction ? "white" : "primary.900"}
            size={"sm"}
            variant={'ghost'}
            icon={<Icon
              as={MaterialIcons}
              name="cancel"
            />}
          />
          )}
        </HStack>
      )}
    </Pressable>
  )
}

export default ChipItem
