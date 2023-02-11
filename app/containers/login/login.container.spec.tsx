import { fireEvent, render, waitFor } from "@testing-library/react-native"
import { RootStoreModel, RootStoreProvider } from "models"
import * as React from "react"
import { NativeBaseProvider } from "theme"
import { Environment } from "../../models/environment"
import { LoginContainer } from "./login.container"

describe("LoginContainer", () => {
  test("<Login> exists", async function () {
    const component = render(
      <NativeBaseProvider>
        <RootStoreProvider value={RootStoreModel.create()}>
          <LoginContainer />
        </RootStoreProvider>
      </NativeBaseProvider>,
    )

    const { queryByTestId } = component
    const container = queryByTestId("loginContainer")

    expect(container).toBeTruthy()
  })

  test("should show error if password or email are invalid", async () => {
    const env = new Environment()
    await env.setup()
    const component = render(
      <NativeBaseProvider>
        <RootStoreProvider value={RootStoreModel.create({}, env)}>
          <LoginContainer />
        </RootStoreProvider>
      </NativeBaseProvider>,
    )

    const { queryByTestId, findByTestId } = component

    const usernameInputField = await findByTestId("username")
    const passwordInputField = await findByTestId("password")
    const submitButton = await findByTestId("login")
    const errorLabelField = queryByTestId("error")

    fireEvent.changeText(usernameInputField, "paulo@mail.com")
    fireEvent.changeText(passwordInputField, "InvalidPassword")
    fireEvent.press(submitButton)
    await waitFor(async() => {
      expect(errorLabelField).toBeTruthy()
    })
  })

  test("should have no error on initialization", () => {
    const component = render(
      <NativeBaseProvider>
        <RootStoreProvider value={RootStoreModel.create({})}>
          <LoginContainer />
        </RootStoreProvider>
      </NativeBaseProvider>,
    )

    const { queryByTestId } = component

    const errorLabelField = queryByTestId("error")

    expect(errorLabelField).toBeNull()
  })
})
