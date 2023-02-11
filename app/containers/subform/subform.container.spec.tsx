import { getSnapshot } from "mobx-state-tree"
import { FormStoreModel, RootStoreModel, RootStoreProvider, TFormStoreIn } from "models"
import { FormControl } from "native-base"
import * as React from "react"
import { render, screen, waitFor } from "test-utils"
import { SubformContainer } from "./subform.container"

describe("<Subform>", () => {
  it("show error if can't find subform", async function () {
    const formStore = {
      currentPage: 0,
      form: {
        id: "s",
        name: "Just a form",
        fieldset: [],
      },
    }
    const { queryByText } = render(
      <RootStoreProvider value={RootStoreModel.create({ formStore })}>
        <FormControl>
          <SubformContainer id={"id"} formId={"form"} />
        </FormControl>
      </RootStoreProvider>,
    )

    expect(queryByText("Não foi possível encontrar o formulário")).toBeTruthy()
  })
  it("Show preview form with no items",async () => {
    const SUBFORM_ID = "7896548215"
    const SUBFORM_CONTROL_ID = "12"
    const formStore: TFormStoreIn = {
      currentPage: 0,
      form: {
        id: "s",
        name: "Just a form",
        fieldset: [
          {
            id: 1,
            label: "Label",
            description: "desc",
            controls: [
              {
                label: "Simple form control pointer",
                id: SUBFORM_CONTROL_ID,
                type: "form",
                value: SUBFORM_ID,
              },
            ],
          },
        ],
      },
      secundaryForm: [
        {
          id: SUBFORM_ID,
          name: "Second Form",
          fieldset: [
            {
              id: 2,
              label: "second Form fieldset",
              description: "field set",
              controls: [{ id: 12, type: "text", label: "First Name" }],
            },
          ],
        },
      ],
    }
    const { queryByText } = render(
      <RootStoreProvider value={RootStoreModel.create({ formStore })}>
        <FormControl>
          <SubformContainer formId="s" id={SUBFORM_CONTROL_ID} />
        </FormControl>
      </RootStoreProvider>,
    )
    screen.debug()

    await waitFor(() => expect(queryByText("Adicionar")).toBeTruthy())
  })
  it("create a new subform", async function () {
    const formStore = FormStoreModel.create({
      currentPage: 0,
      form: {
        id: "s",
        name: "Just a form",
        fieldset: [],
      },
    })
    render(
      <RootStoreProvider value={RootStoreModel.create({ formStore: getSnapshot(formStore) })}>
        <FormControl>
          <SubformContainer id={"id"} formId={"form"} />
        </FormControl>
      </RootStoreProvider>,
    )

    expect(screen.queryByText("Adicionar")).toBeTruthy()
  })
  it("delete a subform", async function () {
    const SUBFORM_ID = "7896548215"
    const SUBFORM_CONTROL_ID = "12"
    const formStore: TFormStoreIn = {
      currentPage: 0,
      form: {
        id: "s",
        name: "Just a form",
        fieldset: [],
      },
    }
    const { queryByText } = render(
      <RootStoreProvider value={RootStoreModel.create({ formStore })}>
        <FormControl>
          <SubformContainer formId="s" id={SUBFORM_CONTROL_ID} />
        </FormControl>
      </RootStoreProvider>,
    )
    expect(queryByText("Adicionar")).toBeTruthy()
  })
  it("show a subform", async function () {
    const SUBFORM_ID = "7896548215"
    const SUBFORM_CONTROL_ID = "12"
    const formStore: TFormStoreIn = {
      currentPage: 0,
      form: {
        id: "s",
        name: "Just a form",
        fieldset: [],
      },
    }
    const { queryByText } = render(
      <RootStoreProvider value={RootStoreModel.create({ formStore })}>
        <FormControl>
          <SubformContainer formId="s" id={SUBFORM_CONTROL_ID} />
        </FormControl>
      </RootStoreProvider>,
    )
    expect(queryByText("Adicionar")).toBeTruthy()
  })
  it("delete a subform", async function () {
    const SUBFORM_ID = "7896548215"
    const SUBFORM_CONTROL_ID = "12"
    const formStore: TFormStoreIn = {
      currentPage: 0,
      form: {
        id: "s",
        name: "Just a form",
        fieldset: [],
      },
    }
    const { queryByText } = render(
      <RootStoreProvider value={RootStoreModel.create({ formStore })}>
        <FormControl>
          <SubformContainer formId='s' id={SUBFORM_CONTROL_ID} />
        </FormControl>
      </RootStoreProvider>,
    )

    expect(queryByText("Adicionar")).toBeTruthy()
  })
})
