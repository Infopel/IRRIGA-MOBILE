import { fireEvent, render } from "@testing-library/react-native"
import * as React from "react"
import { FormSubmissionModalContainer } from "./form-submission-modal.container"
import { RootStoreModel, RootStoreProvider } from "models"
import { NativeBaseProvider } from "theme"

test("<FormSubmissionModal> exists", async function () {
  const component = (
    <NativeBaseProvider>
      <RootStoreProvider value={RootStoreModel.create()}>
        <FormSubmissionModalContainer></FormSubmissionModalContainer>
      </RootStoreProvider>
    </NativeBaseProvider>
  )

  const { findByTestId } = render(component)

  const container = await findByTestId("formSubmissionModalContainer")

  expect(container).toBeTruthy()
})
