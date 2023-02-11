import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"

import { MaterialIcons } from "@expo/vector-icons"
import { useStores } from "models"
import { Button, Center, Heading, Icon, Modal } from "native-base"
import { goBack, navigate } from "navigators/navigation-utilities"
import { FormSubmissionModalStyles as styles } from "./form-submission-modal.styles"

export interface FormSubmissionModalProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormSubmissionModalContainer = observer(function FormSubmissionModal(
  props: FormSubmissionModalProps,
) {
  const { style } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  const {
    formStore: { isFormSubmitted, clearForm },
  } = useStores()

  const handleOnPress = () => {
    clearForm()
    goBack()
  }

  return (
    <Center style={containerStyle} testID="formSubmissionModalContainer">
      <Modal isOpen={isFormSubmitted}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center my={2}>
              <Icon as={MaterialIcons} color="primary.600" name="check-circle" size="4xl" />
              <Heading textAlign={"center"} mt={4}>
                Formulário Preenchido
              </Heading>
              <Heading size={"md"} mt={2} textAlign={"center"}>
                Operação Executada com Sucesso
              </Heading>
            </Center>
          </Modal.Body>
          <Modal.Footer>
            <Center flex={1}>
              <Button variant="ghost" onPress={handleOnPress}>
                Terminar
              </Button>
            </Center>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
  )
})
