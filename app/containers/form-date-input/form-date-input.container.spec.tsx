import { fireEvent } from "@testing-library/react-native"
import { SnapshotIn } from "mobx-state-tree"
import { FormStoreModel, RootStoreModel, RootStoreProvider } from "models"
import * as React from "react"
import { NativeBaseProvider } from "theme"
import { render, waitFor } from "utils/test-utils"
import { FormDateInputContainer } from "./form-date-input.container"
test("<FormDateInput> exists", async function () {
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
              label: "Data de nascimento",
              type: "date",
            },
          ],
        },
      ],
    },
  }
  const component = (
    <NativeBaseProvider>
      <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
        <FormDateInputContainer {...{ id: "1", label: "test", formId: "44" }}></FormDateInputContainer>
      </RootStoreProvider>
    </NativeBaseProvider>
  )

  const { getByPlaceholderText } = render(component)

  expect(getByPlaceholderText("DD/MM/AAAA")).toBeTruthy()
})
test("<FormDateInput> render date from store", async function () {
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
              label: "Data de nascimento",
              type: "date",
            },
          ],
        },
      ],
    },
    output: [
      {
        form: "1256d",
        input: 1,
        value: "1607983200000",
      },
    ],
  }

  const component = (
    <NativeBaseProvider>
      <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
        <FormDateInputContainer {...{ id: "1", label: "test", formId: "44" }}></FormDateInputContainer>
      </RootStoreProvider>
    </NativeBaseProvider>
  )

  const { findByTestId, findByDisplayValue, debug } = render(component)
  const dateComponent = await findByDisplayValue("15/12/2020")

  expect(dateComponent).toBeTruthy()
})
test("<FormDateInput> set date input", async function () {
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
              label: "Data de nascimento",
              type: "date",
            },
          ],
        },
      ],
    },
    output: [
      {
        form: "1256d",
        input: 1,
      },
    ],
  }

  const component = (
    <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
      <FormDateInputContainer {...{ id: "1", label: "test", formId: "44" }}></FormDateInputContainer>
    </RootStoreProvider>
  )

  const { findByPlaceholderText, getByDisplayValue, getByText, debug } = render(component)
  const dateComponent = await findByPlaceholderText("DD/MM/AAAA")

  fireEvent(dateComponent, "onKeyPress", {
    nativeEvent: { key: "1" },
    persist: jest.fn(),
  })
  expect(getByText(". . .")).toBeTruthy()
  fireEvent(dateComponent, "onKeyPress", {
    nativeEvent: { key: "2" },
    persist: jest.fn(),
  })
  expect(getByText(". . .")).toBeTruthy()
  fireEvent(dateComponent, "onKeyPress", {
    nativeEvent: { key: "1" },
    persist: jest.fn(),
  })
  expect(getByText(". . .")).toBeTruthy()
  fireEvent(dateComponent, "onKeyPress", {
    nativeEvent: { key: "0" },
    persist: jest.fn(),
  })
  expect(getByText(". . .")).toBeTruthy()
  fireEvent(dateComponent, "onKeyPress", {
    nativeEvent: { key: "2" },
    persist: jest.fn(),
  })
  expect(getByText(". . .")).toBeTruthy()
  fireEvent(dateComponent, "onKeyPress", {
    nativeEvent: { key: "0" },
    persist: jest.fn(),
  })
  expect(getByText(". . .")).toBeTruthy()
  fireEvent(dateComponent, "onKeyPress", {
    nativeEvent: { key: "0" },
    persist: jest.fn(),
  })
  expect(getByText(". . .")).toBeTruthy()
  fireEvent(dateComponent, "onKeyPress", {
    nativeEvent: { key: "9" },
    persist: jest.fn(),
  })

  expect(getByDisplayValue("12/10/2009")).toBeTruthy()
  debug()
  expect(getByText("segunda-feira")).toBeTruthy()
})
