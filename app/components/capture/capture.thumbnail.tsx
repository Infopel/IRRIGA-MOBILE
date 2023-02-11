import { MaterialIcons } from "@expo/vector-icons"
import { Box, Icon, IconButton, Image, ZStack } from "native-base"
import React from "react"
import { ImageFullscreen } from "./capture.image-fullscreen"
interface ThumbnailProps {
  label: string
  images: string[]
}

export function Thumbnail({ images, label }: ThumbnailProps) {
  const [imagesVisible, setIsImagesVisible] = React.useState(false)
  return (
    <Box>
      {images?.length > 0 && (
        <ZStack h={"32"}>
          <ImageFullscreen
            setIsVisible={setIsImagesVisible}
            visible={imagesVisible}
            label={label}
            images={images}
          />
          {images.map((src, index) => (
            <Image
              key={src}
              alt={"imagem no formulario " + (index + 1)}
              borderColor={'blue.100'}
              borderWidth={"1"}
              h={"32"}
              shadow={index * 2}
              ml={index * 8}
              borderRadius={"md"}
              src={src}
              style={{ aspectRatio: 1 }}
            />
          ))}
          <IconButton
            onPress={setIsImagesVisible.bind(this, true)}
            shadow={8}
            m={2}
            p={1}
            bg="text.500"
            icon={<Icon m={0} p={0} as={MaterialIcons} name="fullscreen" color={"primary.500"} />}
          />
        </ZStack>
      )}
    </Box>
  )
}
