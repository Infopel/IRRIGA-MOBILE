import { fireEvent, render } from "@testing-library/react-native"
import * as React from "react"
import { FormSelectorContainer } from "./form-selector.container"
import {
  FieldModel,
  FieldsetModel,
  FormModel,
  FormStoreModel,
  RootStoreModel,
  RootStoreProvider,
} from "models"
import { NativeBaseProvider } from "theme"
import { SnapshotIn, types } from "mobx-state-tree"

test("<FormSelector> exists", async function () {
  const form: SnapshotIn<typeof FormStoreModel> = {
    currentPage: 0,
    isFormSubmitted: false,
    isRequestingForm: false,
    form: {
      id: "1256d",
      name: "Simple Form",
      fieldset: [
        {
          description: "Step or Page 1",
          id: 1,
          label: "Step 1",
          controls: [
            {
              id: 1,
              label: "First Name",
              type: "text",
            },
          ],
        },
      ],
    },
  }
  const component = (
    <NativeBaseProvider>
      <RootStoreProvider
        value={RootStoreModel.create({
          formStore: form,
        })}
      >
        <FormSelectorContainer {...{ id: "1", label: "Control" }}></FormSelectorContainer>
      </RootStoreProvider>
    </NativeBaseProvider>
  )

  const { findByTestId } = render(component)

  const container = await findByTestId("formSelectorContainer")

  expect(container).toBeTruthy()
})
