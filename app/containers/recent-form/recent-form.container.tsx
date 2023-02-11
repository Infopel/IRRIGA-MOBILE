import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useIsFocused } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { SnapshotOut } from "mobx-state-tree"
import { FormStoreModel } from "models"
import { Button, Heading, View } from "native-base"
import { navigate } from "navigators"
import * as React from "react"
import logger from "utils/logger"

export interface RecentFormProps {
  /**
   * An optional style override useful for padding & margin.
   */
  // style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const RecentFormContainer = observer(function RecentForm(props: RecentFormProps) {
  const [name, setName] = React.useState<string>()
  const [isError, setIsError] = React.useState(false)
  const handleResult = (error?: Error | null, result?: string | null) => {
    if (result && result !== 'null') {
      logger.log({result, error})
      try {
        const parsed: SnapshotOut<typeof FormStoreModel> = JSON.parse(result)
        setName(parsed.form?.name ?? undefined)
      } catch (error) {
        logger.log(error)
      }
    }else setName(undefined)

    setIsError(error ? true : false)
  }
  const { getItem } = useAsyncStorage("formStore")
  const isFocused = useIsFocused()

  logger.log({ isError, name })
  React.useEffect(() => {
    getItem(handleResult)
  }, [isFocused])

  if (isError || !name) {
    return <View />
  }

  return (
    <View>
      <Heading size='md' mt='2'>Continuar onde estava ...</Heading>
      <Button
        variant={"ghost"}
        justifyContent={"flex-start"}
        onPress={navigate.bind(this, "form", { loadPrevious: true })}
      >
        {name}
      </Button>
    </View>
  )
})
