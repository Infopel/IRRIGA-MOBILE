import { Chips } from "components"
import { FormInput } from "containers/FormInput.types"
import { observer } from "mobx-react-lite"
import { useStores } from "models"
import { FormControl, useDisclose } from "native-base"
import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import logger from "utils/logger"
import { SubformActionSheet } from "./subform.actionsheet"

export interface SubformProps extends FormInput {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  formId: string
}

/**
 * Describe your component here
 */
export const SubformContainer = observer(function ({
  id,
  formId: parentFormId,
  label,
  style,
}: SubformProps) {

  const store = useStores()

  const {
    formStore: {
      getAllFieldsFromForm,
      getSubformOutput,
      resetSubform,
      updateSubform,
      saveSubform,
      setSubformOutput,
      deleteSubformOutput,
    },
  } = store
  const allFields = getAllFieldsFromForm(id, parentFormId)

  const [filledSubformId, setFilledSubformId] = React.useState<string>()
  const isUpdateSubform = filledSubformId !== undefined

  if (!allFields)
    return (
      <FormControl.ErrorMessage isInvalid>
        Não foi possível encontrar o formulário
      </FormControl.ErrorMessage>
    )

  const { fields, formId } = allFields
  const value = getSubformOutput(id, formId)

  const { isOpen, onClose, onToggle, onOpen } = useDisclose()
  const handleSaveSubform = () => {
    const isSaved = isUpdateSubform
      ? updateSubform(id, formId, filledSubformId)
      : saveSubform(id, formId, parentFormId)
    if (isSaved) {
      onToggle()
      handleResetSubform()
    }
  }
  const handleResetSubform = () => {
    setFilledSubformId(undefined)
    resetSubform(formId)
    onToggle()
  }

  React.useEffect(() => {
    if (filledSubformId) {
      setSubformOutput(filledSubformId)
    } else {
      resetSubform(formId)
    }
  }, [filledSubformId])

  const handleSetSubformOutput = (item: string, action: "delete" | "press") => {
    if (action === "press") {
      setFilledSubformId(item)
      onOpen()
      return
    }

    deleteSubformOutput(item)
  }

  const handleOpenSubform = () => {
    handleResetSubform()
    onOpen()
  }

  return (
    <>
      <Chips
        items={value.slice()}
        onAction={handleOpenSubform}
        onItemClick={handleSetSubformOutput.bind(this)}
      />
      <SubformActionSheet
        label={label}
        onSaveSubform={handleSaveSubform}
        onResetSubform={handleResetSubform}
        isUpdate={isUpdateSubform}
        {...{ isOpen, onClose, formId, fields }}
      />
    </>
  )
})
