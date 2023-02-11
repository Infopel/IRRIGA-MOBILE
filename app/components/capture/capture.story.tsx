import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color } from "../../theme"
import { Capture } from "./capture.component"
import { NativeBaseProvider } from "native-base"
import { theme } from "../../theme/theme"

storiesOf("Capture", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="No Image" usage="The primary.">
        <Capture onChange={() => {}} />
      </UseCase>
      <UseCase text="With Images" usage="The primary.">
        <Capture
          onChange={() => {}}
          images={[
            "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
            "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
            "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
          ]}
        />
      </UseCase>
    </Story>
  ))
