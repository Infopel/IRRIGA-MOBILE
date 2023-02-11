import { Function } from "lodash"
import { Modal, useDisclose } from "native-base"
import React from "react"
import { DatePicker } from "./date-picker"

interface DatePickerModalProps {
  title: string
  date?: number
  onChange: (date: number) => void
  onClose: () => void
  isOpen: boolean
  min?: number
  max?: number
}

export function DatePickerModal({
  title,
  onChange,
  date,
  onClose,
  min,
  max,
  isOpen,
}: DatePickerModalProps) {
  const handleOnDateChange = (date: number)=> {
    onChange(date)
    onClose()
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content >
        <Modal.CloseButton onPress={onClose} />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <DatePicker {...{ date, onChange:handleOnDateChange, min, max }} />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}
