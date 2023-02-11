import { fireEvent, render } from "@testing-library/react-native"
import { SnapshotIn } from "mobx-state-tree"
import { FormStoreModel, RootStoreModel, RootStoreProvider } from "models"
import * as React from "react"
import { NativeBaseProvider } from "theme"
import { FormRadioContainer } from "./form-radio.container"

test("<FormRadio> exists", async function () {
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
      <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
        <FormRadioContainer {...{ id: "1", label: "test" }}></FormRadioContainer>
      </RootStoreProvider>
    </NativeBaseProvider>
  )

  const { findByTestId } = render(component)

  const container = await findByTestId("formRadioContainer")

  expect(container).toBeTruthy()
})
