import { fireEvent, render, waitFor } from "test-utils"
import { Field, FieldModel, FormStoreModel, RootStoreModel, RootStoreProvider } from "models"
import { NativeBaseProvider } from "theme"
import * as React from "react"
import { FormInputContainer } from "./form-input.container"
import { SnapshotIn } from "mobx-state-tree"

describe("<FormInput>", () => {
  it("<FormInput> exists", async function () {
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
          <FormInputContainer formId="1256d" id="1" label="Adicionar Documento"></FormInputContainer>
        </RootStoreProvider>
      </NativeBaseProvider>
    )

    const { findByTestId } = render(component)

    const container = await findByTestId("formInputContainer")

    expect(container).toBeTruthy()
  })

  it("should change text", async () => {
    const control = { id: 1, label: "First Name", placeholder: "First Name", type: "text" }
    const INPUT = "new super text"
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
            controls: [control],
          },
        ],
      },
    }

    const component = (
      <NativeBaseProvider>
        <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
          <FormInputContainer formId="1256d" id="1" label={control.placeholder}></FormInputContainer>
        </RootStoreProvider>
      </NativeBaseProvider>
    )

    const { debug, getByPlaceholderText, getByDisplayValue } = render(component)
    const container = getByPlaceholderText(control.label)
    fireEvent.changeText(container, INPUT)

    expect(getByDisplayValue(INPUT)).toBeTruthy()
  })

  it("should format money input", async () => {
    const control: SnapshotIn<typeof FieldModel> = {
      id: "1",
      label: "First Name",
      placeholder: "First Name",
      type: "text",
      validators: {
        required: false,
        max: 0,
        min: 0,
        contentType: "number",
      },
    }

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
            controls: [control],
          },
        ],
      },
    }

    const component = (
      <NativeBaseProvider>
        <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
          <FormInputContainer formId="1256d" id="1" label={control.placeholder ?? ""}></FormInputContainer>
        </RootStoreProvider>
      </NativeBaseProvider>
    )

    const { getByPlaceholderText, getByDisplayValue } = render(component)
    const container = getByPlaceholderText(control.label)
    fireEvent(container, "onKeyPress", { nativeEvent: { key: "1" }, persist: jest.fn() })
    fireEvent(container, "onKeyPress", { nativeEvent: { key: "0" }, persist: jest.fn() })
    fireEvent(container, "onKeyPress", { nativeEvent: { key: "0" }, persist: jest.fn() })
    fireEvent(container, "onKeyPress", { nativeEvent: { key: "0" }, persist: jest.fn() })

    expect(getByDisplayValue("1 000")).toBeTruthy()
  })
  it("should format paper contract input", async () => {
    const CODE = "MZ-INIR-206033-CW-RFB"
    const control: SnapshotIn<typeof FieldModel> = {
      id: "1",
      label: "First Name",
      placeholder: "First Name",
      type: "text",
      validators: {
        required: false,
        max: 0,
        min: 0,
        contentType: "paper-entity-code",
      },
    }

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
            controls: [control],
          },
        ],
      },
    }

    const component = (
      <NativeBaseProvider>
        <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
          <FormInputContainer formId="1256d" id="1" label={control.placeholder ?? ""}></FormInputContainer>
        </RootStoreProvider>
      </NativeBaseProvider>
    )

    const { getByPlaceholderText, getByDisplayValue, debug } = render(component)
    const container = getByPlaceholderText(control.label);
    [...CODE.replace(/-/g, "")].forEach((i) => {
      fireEvent(container, "onKeyPress", { nativeEvent: { key: i.toLowerCase() }, persist: jest.fn() })
    })
    
    expect(getByDisplayValue(CODE.toLocaleLowerCase())).toBeTruthy()
  })
  it("should format DUAT", async () => {
    const CODE = "AB/BHUK"
    const control: SnapshotIn<typeof FieldModel> = {
      id: "1",
      label: "Simple Duat",
      placeholder: "Inset duat code",
      type: "text",
      validators: {
        required: false,
        max: 0,
        min: 0,
        contentType: "duat",
      },
    }

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
            controls: [control],
          },
        ],
      },
    }

    const component = (
      <NativeBaseProvider>
        <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
          <FormInputContainer formId="1256d" id="1" label={control.placeholder ?? ""}></FormInputContainer>
        </RootStoreProvider>
      </NativeBaseProvider>
    )

    const { getByPlaceholderText, getByDisplayValue, debug } = render(component)
    const container = getByPlaceholderText(control.label);
    [...CODE.replace(new RegExp("/"), "")].forEach((i) => {
      fireEvent(container, "onKeyPress", { nativeEvent: { key: i.toLowerCase() }, persist: jest.fn() })
    })

    debug()
    
    expect(getByDisplayValue(CODE.toLocaleLowerCase())).toBeTruthy()
  })
  it("should show 100 after removing last 0 from 1000 input", async () => {
    const control: SnapshotIn<typeof FieldModel> = {
      id: "1",
      label: "First Name",
      placeholder: "First Name",
      type: "text",
      validators: {
        required: false,
        max: 0,
        min: 0,
        contentType: "number",
      },
    }

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
            controls: [control],
          },
        ],
      },
      output: [
        {
          input: "1",
          form: "1256d",
          value: "1000",
        },
      ],
    }

    const component = (
      <NativeBaseProvider>
        <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
          <FormInputContainer formId="1256d" id="1" label={control.placeholder ?? ""}></FormInputContainer>
        </RootStoreProvider>
      </NativeBaseProvider>
    )

    const { debug, getByPlaceholderText, getByDisplayValue } = render(component)
    const container = getByPlaceholderText(control.label)
    fireEvent(container, "onKeyPress", { nativeEvent: { key: "Backspace" }, persist: jest.fn() })

    await waitFor(() => expect(getByDisplayValue("100")).toBeTruthy())
  })
})
