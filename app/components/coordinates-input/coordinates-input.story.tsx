import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { CoordinatesInput } from "./coordinates-input.component"

storiesOf("CoordinatesInput", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Default", () => (
    <Story>
      <UseCase text="Empty" usage="The primary.">
        <CoordinatesInput onPress={()=>{}}/>
      </UseCase>
      <UseCase text="With data" usage="The primary.">
        <CoordinatesInput onPress={()=>{}} coord={{ lat: 31.1558885, lng: -32.455885 }} />
      </UseCase>
      <UseCase text="Loading" usage="The primary.">
        <CoordinatesInput onPress={()=>{}} isLoading/>
      </UseCase>
      <UseCase text="Disabled" usage="The primary.">
        <CoordinatesInput onPress={()=>{}} isDisabled />
      </UseCase>
 
    </Story>
  ))
 