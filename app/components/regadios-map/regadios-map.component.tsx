import { RegadioBottomSheet } from "components/regadio-bottom-sheet/regadio-bottom-sheet.component"
import { SearchBar } from "components/search-bar/search-bar.component"
import { Box, useDisclose } from "native-base"
import * as React from "react"
import { StyleProp, StyleSheet, ViewStyle } from "react-native"
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { WaterSupplyListItem } from "storage/queries/water-supplies"

export interface RegadiosMapProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  items?: WaterSupplyListItem[]
}

/**
 * Describe your component here
 */
export const RegadiosMap = function RegadiosMap(props: RegadiosMapProps) {
  const { style } = props
  const [regadio, setRegadio] = React.useState<string>()
  const { onClose, isOpen, onOpen } = useDisclose()

  const handleSetRegadio = (reg?: string) => {
    setRegadio(reg)
    if (reg) {
      onOpen()
    } else onClose()
  }
  const [searchText, setSearchText] = React.useState<string>()

  return (
    <Box h="full" w="full">
      <MapView
        style={StyleSheet.absoluteFill}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        region={{
          latitude: -25.600251,
          longitude: 32.237976,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        {props.items?.map((item) => (
          <Marker
            key={item.id}
            coordinate={{ latitude: item.location.lat, longitude: item.location.lng }}
            title={item.name}
            onCalloutPress={handleSetRegadio.bind(this, item.id)}
            // description={marker.description}
          >
             {/* <Callout>
              <Heading>{item.name}</Heading>
              <Button isDisabled variant="ghost">
                Salvaguardas Sociais
              </Button>
              <Button isDisabled variant="ghost">
                Salvaguardas Ambientais
              </Button>
              <Button variant="ghost" onPress={handleSetRegadio.bind(this, item)}>
                Regadio
              </Button>
            </Callout>  */}
          </Marker>
        ))}
      </MapView>
      <Box position={"absolute"} top="2" left="2" right="2">
        <SearchBar
          placeholder="Nome do regadio"
          onChangeText={setSearchText}
          value={searchText}
        />
      </Box>
      {regadio && <RegadioBottomSheet item={regadio} isVisible={isOpen} onClose={onClose} />}
    </Box>
  )
}
