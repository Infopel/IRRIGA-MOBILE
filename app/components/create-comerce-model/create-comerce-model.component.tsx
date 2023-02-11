import { Database } from "@nozbe/watermelondb"
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider"
import withObservables from "@nozbe/with-observables"
import { FormikHelpers, useFormik } from "formik"
import { isNil } from "lodash"
import { Culture, useStores } from "models"
import {
  Actionsheet,
  Button,
  FormControl,
  IActionsheetProps,
  Input,
  Select,
  VStack,
  WarningOutlineIcon,
} from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { QueryableFormField } from "storage/models/queryable-form-field"
import { findAllQueryFieldFrom } from "storage/queries"
import { TextUtils } from "utils/TextUtils"
import * as Yup from "yup"

export interface CreateComerceModelProps extends IActionsheetProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  cultures: Culture[]
  beneficiaryId: string
}

type CultureValidationInput = { cultureId?: string; price?: number; weight?: number }

/**
 * Describe your component here
 */
const _CreateComerceModel = function CreateComerceModel(props: CreateComerceModelProps) {
  const { style, cultures, beneficiaryId, ...rest } = props
  const {
    commerceStore: { addCommerce },
  } = useStores()
  const handleSaveCommerce = (
    { cultureId, price, weight }: Required<CultureValidationInput>,
    helpers: FormikHelpers<CultureValidationInput>,
  ) => {
    addCommerce(cultureId, price, weight, beneficiaryId)
      .then(() => {
        handleDismiss()
      })
      .catch((error) => {
        console.tron.error(error.message, error.stack)
      })
  }
  const handleDismiss = () => {
    resetForm()
    props.onClose?.()
  }

  const {
    handleSubmit,
    handleBlur,
    errors,
    handleChange,
    resetForm,
    values,
  } = useFormik<CultureValidationInput>({
    initialValues: {
      price: undefined,
      weight: undefined,
      cultureId: undefined,
    },
    validationSchema: Yup.object({
      price: Yup.number().required(),
      weight: Yup.number().required(),
      cultureId: Yup.string().required(),
    }),
    //@ts-ignore
    onSubmit: handleSaveCommerce,
  })

  return (
    <Actionsheet {...rest}>
      <Actionsheet.Content p={4} mx={4}>
        <FormControl isRequired isInvalid={!isNil(errors.cultureId)}>
          <FormControl.Label>Cultura</FormControl.Label>
          <Select
            placeholder="Ex: Tomate"
            selectedValue={values.cultureId}
            onValueChange={handleChange("cultureId")}
          >
            {props.cultures.map(({ name, id }) => (
              <Select.Item label={name} value={id} />
            ))}
          </Select>
          <FormControl.ErrorMessage
            isInvalid={!isNil(errors.cultureId)}
            leftIcon={<WarningOutlineIcon size="xs" />}
          >
            {errors.cultureId}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!isNil(errors.weight)}>
          <FormControl.Label>Peso</FormControl.Label>
          <Input
            value={TextUtils.numberOrEmpty(values.weight)}
            onChangeText={handleChange("weight")}
            onBlur={handleBlur("weight")}
            keyboardType="numeric"
            placeholder="Ex: 200"
          />
          <FormControl.ErrorMessage isInvalid={!isNil(errors.weight)}>
            {errors.weight}
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={!isNil(errors.price)}>
          <FormControl.Label>Preco</FormControl.Label>
          <Input
            value={TextUtils.numberOrEmpty(values.price)}
            onChangeText={handleChange("price")}
            onBlur={handleBlur("price")}
            keyboardType="numeric"
            placeholder="Ex: 500"
          />
          <FormControl.ErrorMessage isInvalid={!isNil(errors.price)}>
            {errors.price}
          </FormControl.ErrorMessage>
        </FormControl>
        <Button.Group pt={4}>
          <Button flex={1} onPress={handleSubmit}>
            Salvar
          </Button>
          <Button flex={1} colorScheme="error" onPress={handleDismiss}>
            Cancelar
          </Button>
        </Button.Group>
      </Actionsheet.Content>
    </Actionsheet>
  )
}

export const CreateComerceModel = withDatabase(
  withObservables([], ({ database }: { database: Database }) => {
    return {
      cultures: findAllQueryFieldFrom(database, QueryableFormField.fields.culture),
    }
    //@ts-ignore
  })(_CreateComerceModel),
)
