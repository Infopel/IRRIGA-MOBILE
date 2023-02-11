import { MaterialIcons } from "@expo/vector-icons"
import { isValid } from "date-fns"
import { isNil } from "lodash"
import { Divider, HStack, Icon, IconButton, IInputProps, Input, Text, useDisclose } from "native-base"
import * as React from "react"
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native"
import { DateUtils } from "../../utils/DateUitls"
import { DatePickerModal } from "./date-picker-modal"

export interface DateInputProps extends IInputProps {
  /**
   * An optional style override useful for padding & margin.
   */
  label: string
  date?: number  | null
  min?: number
  max?: number
  onChangeDate: (date: number | null) => void
}

/**
 * Describe your component here
 */
export const DateInput = function DateInput(props: DateInputProps) {
  const { label, onChangeDate, isInvalid: _isInvalid = false, ...rest } = props

  const [isFirstRendering, setIsFirstRendering] = React.useState(true)
  const [input, setInput] = React.useState("")
  const [dayOfWeek, setDayOfWeek] = React.useState<string>()
  const [isInvalidDate, setIsInvalidDate] = React.useState<boolean>()
  const { isOpen, onOpen, onClose } = useDisclose(false)
  const handleOnKeyPressed = (event: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const key = event.nativeEvent.key
    setIsFirstRendering(false)
    if (new RegExp(/^[0-9]{1}$/).exec(key)) {
      setInput((i) => {
        const chars = (i ?? "") + key
        return chars + (chars.length === 2 || chars.length === 5 ? "/" : "")
      })
    } else if (key === "Backspace") {
      setInput((i) => {
        if (i?.length <= 0) return i
        return i.slice(0, i.length - 1)
      })
    }
  }

  React.useLayoutEffect(() => {
    if (!isFirstRendering) {
      const date = DateUtils.parse(input)
      setIsInvalidDate(!isValid(date) && input.length > 0 && DateUtils.isValidText(input))
      onChangeDate?.(input.length > 0 ? date.getTime() : null)
     
    }
  }, [input])

  React.useEffect(() => {
    const date = props.date
    const text = date && isValid(date) ? DateUtils.formatToShortDate(date) : input
    setInput(text)
    setDayOfWeek(
      date && isValid(date)
        ? DateUtils.getDateOfWeek(date)
        : isNil(input) || input.length !== 0
        ? ". . ."
        : undefined,
    )
  }, [props.date])

  const isInvalid = _isInvalid || isInvalidDate

  return (
    <>
      <Input
        {...rest}
        placeholder={"DD/MM/AAAA"}
        value={input}
        isInvalid={isInvalid}
        onKeyPress={handleOnKeyPressed}
        keyboardType="phone-pad"
        InputRightElement={
          <HStack alignItems={"center"} mx={1}>
            <Text color={isInvalid ? "red.400" : "text.400"} fontSize={"xs"}>
              {dayOfWeek ? dayOfWeek : "Dia de Semana"}
            </Text>
            <Divider thickness={1} mx={2} height="8" orientation="vertical" />
            <IconButton
            onPress={onOpen}
              icon={
                <Icon
                  color={isInvalid ? "red.400" : "text.400"}
                  as={MaterialIcons}
                  name="date-range"
                  size={"md"}
                />
              }
            />
          </HStack>
        }
      />
      <DatePickerModal
        {...{
          isOpen,
          title: label,
          onOpen,
          onClose,
          date: props.date ?? undefined,
          onChange: onChangeDate,
        }}
      />
    </>
  )
}
