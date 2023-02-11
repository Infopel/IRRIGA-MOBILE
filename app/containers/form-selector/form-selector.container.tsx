import { isNil } from "lodash"
import { observer } from "mobx-react-lite"
import { useStores } from "models"
import { Box, CheckIcon, Heading, Input, Progress, Select, Spinner, Text, VStack } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { FormInput } from "../FormInput.types"

export interface FormSelectorProps extends FormInput {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const FormSelectorContainer = observer(function FormSelector(props: FormSelectorProps) {
  const { style, label, id, formId } = props

  const {
    formStore: { getField, updateField, getFieldOutput },
  } = useStores()
  const output = getFieldOutput(id)
  const selectedValue = output?.value
  const error = output?.error
  const warn = output?.warn

  const [searchOption, setSearchOption] = React.useState<string>()

  const field = getField(id, formId)
  if (!field) return null

  const { options, placeholder, isLoadingRequest } = field

  const data = isLoadingRequest ? [] : searchOption ? options?.filter(({ name }) => name.toLocaleUpperCase().includes(searchOption.toLocaleUpperCase())) : options
  // const isLargeDataset = (options ?? []).length > 8 ?? false
  const isLargeDataset =  false

  return (
    <Select
      testID="formSelectorContainer"
      style={style}
      selectedValue={getFieldOutput(id)?.value}
      accessibilityLabel={label}
      placeholder={placeholder ?? label}
      /**@ts-ignore */
      optimized={false}
      _selectedItem={{
        bg: "primary.600",
        endIcon: <CheckIcon size="5" />,
      }}
      onValueChange={updateField.bind(this, props.id)}
    >
      <VStack space={2} mx='2'>
        <Heading>{label}</Heading>
        {isLoadingRequest ? <Spinner size={'lg'} /> : <>{isLargeDataset && <Input onChangeText={setSearchOption} value={searchOption} placeholder='Procurar' />}</>}
        {!isNil(error) && <Text color='error.500'>{error}</Text>}
        {!isNil(warn) && <Text color='warning.500'>{warn}</Text>}
      </VStack>
      {data?.map(({ id, name }) => (
        <Select.Item label={name} value={id + ""} />
      ))}

    </Select>
  )
})
