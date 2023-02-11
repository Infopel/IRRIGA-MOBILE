import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { AddFormationParticipantsModel } from "./add-formation-participants-model.component"

storiesOf("AddFormationParticipantsModel", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <AddFormationParticipantsModel style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
