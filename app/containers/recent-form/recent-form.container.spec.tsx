import { fireEvent, render } from "@testing-library/react-native"
import * as React from "react"
import { RecentFormContainer } from "./recent-form.container"

  test("<RecentForm> exists", async function () {
    const component = <RecentFormContainer></RecentFormContainer>

    const { findByTestId } = render(component)

    const container = await findByTestId("recentFormContainer")

    expect(container).toBeTruthy()
  })

