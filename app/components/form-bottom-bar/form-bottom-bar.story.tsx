import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { FormBottomBar } from "./form-bottom-bar.component"

storiesOf("FormBottomBar", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Bottom", () => (
    <Story>
      <UseCase text="Form is in lastPage" usage="When the form is ready to be published">
        <FormBottomBar
          {...{
            nextPage: () => {},
            previousPage: () => {},
            lastPage: true,
            firstPage: false,
            saveForm: () => {},
          }}
        />
      </UseCase>
      <UseCase text="Form is in FirstPage" usage="First interaction with the form">
        <FormBottomBar
          {...{
            nextPage: () => {},
            previousPage: () => {},
            lastPage: false,
            firstPage: true,
            saveForm: () => {},
          }}
        />
      </UseCase>
      <UseCase text="Form is in the middle" usage="...">
        <FormBottomBar
          {...{
            nextPage: () => {},
            previousPage: () => {},
            lastPage: false,
            firstPage: false,
            saveForm: () => {},
          }}
        />
      </UseCase>
    </Story>
  ))
