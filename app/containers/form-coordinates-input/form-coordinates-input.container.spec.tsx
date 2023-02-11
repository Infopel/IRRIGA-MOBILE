import { fireEvent, render } from "@testing-library/react-native"
import { SnapshotIn } from "mobx-state-tree"
import { FormStoreModel, RootStoreModel, RootStoreProvider } from "models"
import { NativeBaseProvider } from "native-base"
import * as React from "react"
import { FormCoordinatesInputContainer } from "./form-coordinates-input.container"

test("<FormCoordinatesInput> exists", async function () {
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
              type: "location",
            },
          ],
        },
      ],
    },
  }
  
  const component = (
    <NativeBaseProvider>
      <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
        <FormCoordinatesInputContainer
          {...{ id: "1", label: "test" }}
        ></FormCoordinatesInputContainer>
      </RootStoreProvider>
    </NativeBaseProvider>
  )

  const { findByTestId } = render(component)

  const container = await findByTestId("formCoordinatesInputContainer")

  expect(container).toBeTruthy()
})
