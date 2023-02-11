import { InputFieldMapper } from "containers/input-field-mapper"
import { TField } from "models/field/field"
import { IScrollViewProps, ScrollView } from "native-base"
import * as React from "react"

export interface FormBodyProps extends IScrollViewProps {
  fields?: TField[]
  formId: string
}

/**
 * Describe your component here
 */

export function FormBodyContainer({ fields, formId, ...props }: FormBodyProps) {
  return (
    <ScrollView {...props} testID="formBodyContainer">
      {fields?.slice()?.map(({ placeholder, id, validators, ...rest }) => (
        <InputFieldMapper
          isRequired={validators?.required ?? false}
          {...rest}
          id={id + ""}
          key={id}
          formId={formId}
          placeholder={placeholder ?? undefined}
        />
      ))}
    </ScrollView>
  )
}
