import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { CreateEarningModel } from "./create-earning-model.component"

storiesOf("CreateEarningModel", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <CreateEarningModel style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
