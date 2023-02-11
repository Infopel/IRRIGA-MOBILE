import { fireEvent, render } from "@testing-library/react-native"
import * as React from "react"
import { FormToolbarContainer } from "./form-toolbar.container"

  test("<FormToolbar> exists", async function () {
    const component = <FormToolbarContainer></FormToolbarContainer>

    const { findByTestId } = render(component)

    const container = await findByTestId("formToolbarContainer")

    expect(container).toBeTruthy()
  })

