import { RootStoreModel, RootStoreProvider, TField, TFieldSnapshotIn } from "models"
import * as React from "react"
import { ReactTestInstance } from "react-test-renderer"
import { render, waitFor } from "test-utils"
import { NativeBaseProvider } from "../../../app/theme/theme"
import { FormBodyContainer } from "./form-body.container"

test("<FormBody> exists", async function () {
  const component = (
    <NativeBaseProvider>
      <FormBodyContainer fields={[]} formId={"ddd"}></FormBodyContainer>
    </NativeBaseProvider>
  )

  const { findByTestId } = render(component)

  const container = await findByTestId("formBodyContainer")

  expect(container).toBeTruthy()
})

test("<FormBody> renders inner components", async function () {
  const fields: TField[] = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      validators: null,
      value: null,
      placeholder: null,
      filterId: null,
      options: [],
      dependOn: null,
      filterWithDropdown: null,
      isDisabled: false,
      isLoadingRequest: false,
      labelField: null,
    },
    {
      id: "lastName",
      type: "location",
      label: "Last Name",
      validators: null,
      value: null,
      filterId: null,
      placeholder: null,
      options: [],
      dependOn: null,
      filterWithDropdown: null,
      isDisabled: false,
      isLoadingRequest: false,
      labelField: null,
    },
  ]
  const component = (
    <RootStoreProvider value={RootStoreModel.create({})}>
      <NativeBaseProvider>
        <FormBodyContainer fields={fields} formId={"sss"} />
      </NativeBaseProvider>
    </RootStoreProvider>
  )

  const { getByTestId } = render(component)

  const container = getByTestId("formBodyContainer")
  waitFor(() =>
    expect(
      container.children.map((value) => {
        const {
          props: { key },
        } = value as ReactTestInstance
        return key
      }),
    ).toEqual(fields.map(({ id }) => id)),
  )
})

test("<FormBody> renders inner 'input' components", async function () {
  const fields: TField[] = [
    {
      id: "position",
      label: "Find user location",
      type: "location",
      validators: null,
      filterId: null,
      value: null,
      placeholder: "find location",

      options: [],
      dependOn: null,
      filterWithDropdown: null,
      isDisabled: false,
      isLoadingRequest: false,
      labelField: null,

    },
    {
      id: "lastname",
      type: "text",
      label: "Last Name",

      validators: null,
      filterId: null,
      value: null,
      placeholder: null,
      options: [],
      dependOn: null,
      filterWithDropdown: null,
      isDisabled: false,
      isLoadingRequest: false,
      labelField: null,
    },
  ]
  const component = (
    <RootStoreProvider value={RootStoreModel.create({})}>
      <NativeBaseProvider>
        <FormBodyContainer fields={fields} formId={"sss"} />
      </NativeBaseProvider>
    </RootStoreProvider>
  )

  const { queryByLabelText } = render(component)

  expect(queryByLabelText(/Find user location/)).toBeTruthy()
})
test("<FormBody> should not render invalid 'locations' input components", async function () {
  const fields: TField[] = [
    {
      id: "position",
      label: "Find user location",
      type: "locations",
      validators: null,

      value: null,
      placeholder: "find location",

      options: [],
      dependOn: null,
      filterWithDropdown: null,
      isDisabled: false,
      isLoadingRequest: false,
      labelField: null,
      filterId: null,
    },
    {
      id: "lastname",
      type: "text",
      label: "Last Name",

      validators: null,
      filterId: null,
      value: null,
      placeholder: null,
      options: [],
      dependOn: null,
      filterWithDropdown: null,
      isDisabled: false,
      isLoadingRequest: false,
      labelField: null,
    },
  ]
  const component = (
    <RootStoreProvider value={RootStoreModel.create({})}>
      <NativeBaseProvider>
        <FormBodyContainer fields={fields} formId={"ddd"} />
      </NativeBaseProvider>
    </RootStoreProvider>
  )

  const { queryByLabelText } = render(component)

  expect(queryByLabelText(/Find user location/)).toBeFalsy()
})
