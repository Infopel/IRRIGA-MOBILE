import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { NativeBaseProvider } from "../../theme/theme"
import { AppToolbar } from "./app-toolbar.component"

storiesOf("AppToolbar", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <NativeBaseProvider>
          <AppToolbar title="Dashboard"/>
        </NativeBaseProvider>
      </UseCase>
    </Story>
  ))
