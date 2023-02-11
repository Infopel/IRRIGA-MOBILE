import { InputFieldMapper } from "components"
import { FormBodyContainer } from "containers/form-body"
import { Field } from "models"
import {
  Actionsheet,
  AlertDialog,
  Button,
  Heading,
  KeyboardAvoidingView,
  ScrollView,
  useDisclose,
  useLayout,
  VStack,
} from "native-base"
import * as React from "react"
import { useWindowDimensions } from "react-native"
import logger from "utils/logger"
import { SubformDialog } from "./subform.dialog"
interface SubformActionSheetProps {
  isOpen: boolean
  onSaveSubform: () => void
  onClose: () => void
  isUpdate: boolean
  onResetSubform: () => void
  formId: string
  label: string
  fields: Field[]
}
export function SubformActionSheet({
  isOpen,
  onClose,
  fields,
  onResetSubform,
  onSaveSubform,
  isUpdate,
  label,
  formId,
}: SubformActionSheetProps) {
  const { onLayout, layout } = useLayout()
  const { isOpen: isCancelDialogVisible, onClose:onCloseDialog, onOpen } = useDisclose()
  const window = useWindowDimensions()
  const verticalOffset = window.height - layout.height

  const handleOnReset = () => {
    onCloseDialog()
    onResetSubform()
  }

  return (
    <Actionsheet {...{ isOpen, onClose }}>
      <SubformDialog isVisible={isCancelDialogVisible} onClose={onCloseDialog} onSubmit={handleOnReset} />
      <Actionsheet.Content>
        <AlertDialog.CloseButton onPress={onOpen} />
        <VStack alignItems={"center"} w={["full", "md"]} h="lg" {...{ onLayout }}>
          <Heading textAlign={"left"} w="full" mt="2" size="sm" mb="5">
            {label}
          </Heading>
          <KeyboardAvoidingView
            w="full"
            flex={1}
            keyboardVerticalOffset={verticalOffset}
            behavior="padding"
          >
            <FormBodyContainer formId={formId} fields={fields.slice()} />
          </KeyboardAvoidingView>
          <Button.Group w={"full"} isAttached>
            <Button flex="1" onPress={onClose} colorScheme="danger">
              Cancel
            </Button>
            <Button flex="1" onPress={onSaveSubform}>
              {isUpdate ? "Actualizar" : "Salvar"}
            </Button>
          </Button.Group>
        </VStack>
      </Actionsheet.Content>
    </Actionsheet>
  )
}
