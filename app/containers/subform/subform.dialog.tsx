import { AlertDialog, Button, Center } from "native-base"
import React from "react"
interface SubformDialogProps {
  isVisible: boolean
  onSubmit: () => void
  onClose: () => void

}
export function SubformDialog({ isVisible: isOpen, onSubmit, onClose }: SubformDialogProps) {
  const cancelRef = React.useRef(null)

  return (
    <Center>
      <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>Fechar?</AlertDialog.Header>
          <AlertDialog.Body>Tem certeza que quer sair sem salvar?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button.Group space={2}>
              <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
                Voltar
              </Button>
              <Button colorScheme="danger" onPress={onSubmit}>
                Tenho
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </Center>
  )
}
