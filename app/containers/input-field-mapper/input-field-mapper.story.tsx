import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { InputFieldMapper } from "./input-field-mapper.container"
import { NativeBaseProvider, theme } from "native-base"

storiesOf("InputFieldMapper", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <InputFieldMapper />
      </UseCase>
    </Story>
  ))
