import { Button, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import ImagePicker from "react-native-image-crop-picker"
import logger from "utils/logger"
import { CaptureStyles as styles } from "./capture.styles"
import { Thumbnail } from "./capture.thumbnail"

export interface CaptureProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  images?: string[]
  label:string
  onChange: (images: string[]) => void
}

/**
 * Describe your component here
 */
export const Capture = function Capture(props: CaptureProps) {
  const { style, images, onChange, label } = props
  const _label = (images ?? []).length <= 0 ? "Adicionar Imagem" : "Trocar Imagem"
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  const handleTakePicture = () => {
    ImagePicker.openCamera({
      includeBase64: true,
    }).then((value) => onChange([value.path])).catch(logger.error)
  }

  return (
    <VStack style={containerStyle}>
      {images && <Thumbnail label={label} images={[...images]} />}
      <Button
        mt={2}
        width={"full"}
        size={"md"}
        variant="ghost"
        _text={{
          fontWeight: "bold",
          numberOfLines: 1,
          lineBreakMode: "tail",
        }}
        onPress={handleTakePicture}
      >
        {_label}
      </Button>
    </VStack>
  )
}
