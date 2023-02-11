import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider"
import { fireEvent, render } from "@testing-library/react-native"
import * as React from "react"
import { database } from "storage"
import { NativeBaseProvider } from "theme"
import { DashboardSearchListContainer } from "./dashboard-search-list.container"
test("<DashboardSearchList> exists", async function () {
  const component = (
    <NativeBaseProvider>
      <DatabaseProvider database={database}>
        <DashboardSearchListContainer></DashboardSearchListContainer>
      </DatabaseProvider>
    </NativeBaseProvider>
  )

  const { findByTestId } = render(component)

  const container = await findByTestId("dashboardSearchListContainer")

  expect(container).toBeTruthy()
})
