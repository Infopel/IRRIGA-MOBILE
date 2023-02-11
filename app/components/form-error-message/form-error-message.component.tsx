import set from "date-fns/esm/fp/set"
import { AlertDialog, Button, Center, useDisclose } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"

export interface FormErrorMessageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
}

/**
 * Describe your component here
 */
export const FormErrorMessage = function FormErrorMessage(props: FormErrorMessageProps) {
  const { isOpen, onClose, onOpen } = useDisclose()

  React.useEffect(() => {
    if (props.isVisible) {
      onOpen()
    }
  }, [props.isVisible])

  const cancelRef = React.useRef(null)
  return (
    <Center>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Erro ao Validar o formulário</AlertDialog.Header>
          <AlertDialog.Body>Um ou mais campos nao foram devidamente preenchidos</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Voltar
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}
