import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { FormToolbar } from "./form-toolbar.component"
import { NativeBaseProvider, theme } from "native-base"

storiesOf("FormToolbar", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Default", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <FormToolbar
          {...{
            changePage: () => {},
            pageNumber: 1,
            pageTitle: "Form Toolbar",
            totalPages: 8,
          }}
        />
      </UseCase>
    </Story>
  ))
