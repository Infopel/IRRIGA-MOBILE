import * as React from "react"
import { render } from "@testing-library/react-native"
import { RegadiosMap } from "components"
import { NativeBaseProvider } from "theme"
jest.mock('react-native-maps', ()=> 'MapView')
test("should load map", () => {
  const { debug, toJSON } = render(
    <NativeBaseProvider>
      <RegadiosMap items={[]} />
    </NativeBaseProvider>,
  )

  expect(toJSON()).toMatchSnapshot("snap")
})
test("should show list of `regadios`", () => {})
test("should open`regadios` menu", () => {})
