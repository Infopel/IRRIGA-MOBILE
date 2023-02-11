import { getSnapshot, SnapshotIn } from "mobx-state-tree"
import { FormStoreModel, RootStoreModel, RootStoreProvider } from "models"
import * as React from "react"
import { fireEvent, render, waitFor } from "test-utils"
import { FormCaptureContainer } from "./form-capture.container"


describe("<FormCapture>", () => {
  it("should show no image", async function () {
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
                type: "capture",
              },
            ],
          },
        ],
      },
    }
    const { getByText } = render(
      <RootStoreProvider value={RootStoreModel.create({ formStore: form })}>
        <FormCaptureContainer formId="1256d" id="1" label="Documentos"></FormCaptureContainer>
      </RootStoreProvider>,
    )

    expect(getByText("Adicionar Imagem")).toBeTruthy()
  })
  it("should show simple image", async function () {
    const formStore = FormStoreModel.create({
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
                type: "capture",
              },
            ],
          },
        ],
      },
    })
    const { getByText, getByRole } = render(
      <RootStoreProvider value={RootStoreModel.create({ formStore: getSnapshot(formStore) })}>
        <FormCaptureContainer formId="1256d" id="1" label="Documentos"></FormCaptureContainer>
      </RootStoreProvider>,
    )

    expect(getByText("Adicionar Imagem")).toBeTruthy()
    fireEvent.press(getByText("Adicionar Imagem"))
    await waitFor(() => expect(getByText("Trocar Imagem")).toBeTruthy())
    
    expect(getByRole("image")).toBeTruthy()
  })
})
