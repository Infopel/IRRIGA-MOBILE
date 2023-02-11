import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { FormToolbarSkeleton } from "./form-toolbar-skeleton.component"

storiesOf("FormToolbarSkeleton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <FormToolbarSkeleton style={{ backgroundColor: color.error }} />
      </UseCase>
    </Story>
  ))
