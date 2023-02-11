import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { DateInput } from "./date-input.component"

storiesOf("DateInput", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Default", () => (
    <Story>
      <UseCase text="Hint" usage="Component with no date">
        <DateInput label={"Inset date"} onChangeDate={()=> {}}/>
      </UseCase>
   
      <UseCase text="Inserted Date" usage="Component with  date">
        <DateInput date={1653455746632} label={"Inset date"} onChangeDate={()=>{}}/>
      </UseCase>
    </Story>
  ))
