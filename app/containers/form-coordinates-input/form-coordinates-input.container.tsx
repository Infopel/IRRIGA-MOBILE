import { CoordinatesInput } from "components/coordinates-input/coordinates-input.component"
import { observer } from "mobx-react-lite"
import { useStores } from "models/root-store/root-store-context"
import { Box } from "native-base"
import * as React from "react"
import { PermissionsAndroid, StyleProp, ViewStyle } from "react-native"
import Geolocation from "react-native-geolocation-service"
import { FormInput } from "../FormInput.types"
import { FormCoordinatesInputStyles as styles } from "./form-coordinates-input.styles"

export interface FormCoordinatesInputProps extends FormInput {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormCoordinatesInputContainer = observer(function FormCoordinatesInput(
  props: FormCoordinatesInputProps,
) {
  const { style, id, formId } = props
  const containerStyle = {
    ...styles.container,
    ...(style && typeof style === "object" ? style : {}),
  }

  const {
    formStore: { getField, setFieldError, updateField: updateMultiValueField },
  } = useStores()
  const [location, setLocation] = React.useState<{ lat: number; lng: number }>()
  const [isAllowed, setIsAllowed] = React.useState<boolean>()
  const [isLoading, setIsLoading] = React.useState<boolean>()

  const field = getField(id, formId)

  const handleRequestLocation = () => {
    setIsLoading(true)

    if (!isAllowed) {
      isAllowedToLocate()
        .then((res) => {
          setIsAllowed(res)
          if (res) {
            requestLocation()
          } else {
            setFieldError(props.id, "Nao tem permissoes para localizacao")
          }
        })
        .catch()
    }
  }

  async function isAllowedToLocate() {
    const ACCESS_COARSE_LOCATION = await PermissionsAndroid.check(
      "android.permission.ACCESS_COARSE_LOCATION",
    )
    const ACCESS_FINE_LOCATION = await PermissionsAndroid.check(
      "android.permission.ACCESS_FINE_LOCATION",
    )

    if (!ACCESS_COARSE_LOCATION || !ACCESS_FINE_LOCATION) {
      const status = await PermissionsAndroid.requestMultiple([
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
      ])

      if (
        status["android.permission.ACCESS_COARSE_LOCATION"] !== "granted" &&
        status["android.permission.ACCESS_FINE_LOCATION"] !== "granted"
      ) {
        return false
      }
    }
    return true
  }

  function requestLocation() {
    Geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setIsLoading(false)
        setLocation({ lat: latitude, lng: longitude })
        updateMultiValueField(id,[latitude + "", location + ""])
      },
      (error) => {
        setIsLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 1000,
      },
    )
  }

  return (
    <Box testID={"formCoordinatesInputContainer"}>
      <CoordinatesInput onPress={handleRequestLocation} isLoading={isLoading} coord={location} />
    </Box>
  )
})
