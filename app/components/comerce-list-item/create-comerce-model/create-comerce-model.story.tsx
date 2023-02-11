import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { CreateComerceModel } from "./create-comerce-model.component"

storiesOf("CreateComerceModel", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CreateComerceModel style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
