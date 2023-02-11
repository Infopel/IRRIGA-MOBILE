import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { NativeBaseProvider } from "../../theme/theme"
import { AppBottomBar } from "./app-bottom-bar.component"
storiesOf("AppBottomBar", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", (p: any) => {
    const state = { index: 0 }
    const navigation = {
      navigate: (index: string) => {
        state.index = parseInt(index)
      },
    }
   
    return (
      <Story>
        <UseCase text="Primary" usage="The primary.">
          <NativeBaseProvider>
            <AppBottomBar {...{ navigation, ...{ state: { index: 0 } } }} />
            <AppBottomBar {...{ navigation, ...{ state: { index: 1 } } }} />
            <AppBottomBar {...{ navigation, ...{ state: { index: 2 } } }} />
            <AppBottomBar {...{ navigation, ...{ state: { index: 3 } } }} />
          </NativeBaseProvider>
        </UseCase>
      </Story>
    )
  })
