import { remove } from "lodash"
import { Button, FlatList, IconButton, Image, Modal, ZStack } from "native-base"
import React from "react"

interface ImageFullscreenProps {
  images: string[]
  label: string
  visible: boolean
  setIsVisible: (item: boolean) => void
}

export function ImageFullscreen(props: ImageFullscreenProps) {
  const images = props.images.map((item, index) => ({ id: "a" + index, src: item }))
  const [selecedIndex, setSelectedIndex] = React.useState<string>(images[0].id)

  const footerImages = images.filter((image) => image.id !== selecedIndex)

  return (
    <Modal isOpen={props.visible} onClose={props.setIsVisible.bind(this, false)} size="xl">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{props.label}</Modal.Header>
        <Modal.Body p={0}>
          <Image
            alt="Fotografia principal"
            src={images.find(({ id }) => id === selecedIndex)?.src}
            width="full"
            height={"xl"}
          />
        </Modal.Body>
        {footerImages?.length > 0 && (
          <Modal.Footer p={1}>
            <FlatList
              data={footerImages}
              horizontal
              renderItem={({ item, index }) => (
                <ZStack size={16} mr={1}>
                  <Image
                    alt={"Images na selececao numero " + (index + 1)}
                    borderRadius={"md"}
                    src={item.src}
                    size={"16"}
                  />
                  <IconButton
                    size={"full"}
                    bg="contrastThreshold"
                    onPress={setSelectedIndex.bind(this, item.id)}
                  />
                </ZStack>
              )}
            />
          </Modal.Footer>
        )}
      </Modal.Content>
    </Modal>
  )
}
