import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider"
import { render } from "@testing-library/react-native"
import React from "react"
import { database } from "storage"
import { NativeBaseProvider as ThemeProvider } from "theme"
export type AllTheProvidersProps = { children: React.ReactNode }
function AllTheProviders({ children }: AllTheProvidersProps) {
  return (
    <DatabaseProvider database={database}>
      <ThemeProvider>{children}</ThemeProvider>
    </DatabaseProvider>
  )
}

type RenderOptions = {
  wrapper?: React.ComponentType<any>;
  createNodeMock?: (element: React.ReactElement) => any;
}

function customRender<T extends any>(ui: React.ReactElement<T>, options?: RenderOptions) {
  return render(ui, { wrapper: AllTheProviders, ...options })
}

// re-export everything
export * from "@testing-library/react-native"
// override render method
export { customRender as render }
