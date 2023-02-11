import { storiesOf } from "@storybook/react-native"
import { NativeBaseProvider, theme } from "native-base"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { Chips } from "./chips.component"

storiesOf("Chips", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Simple chips" usage="The primary.">
        <Chips
          items={[
            { id: 1, name: "Sopa" },
            { id: 2, name: "Batata" },
            { id: 3, name: "Lagosta" },
            { id: 4, name: "Lola" },
          ]}
        />
      </UseCase>
      <UseCase text="With add button" usage="The primary.">
        <Chips
          items={[
            { id: 1, name: "Sopa" },
            { id: 2, name: "Batata" },
            { id: 3, name: "Lagosta" },
            { id: 4, name: "Lola" },
          ]}
          onAction={() => {}}
        />
      </UseCase>

      <UseCase text="Removable items" usage="The primary.">
        <Chips
          items={[
            { id: 1, name: "Sopa" },
            { id: 2, name: "Batata" },
            { id: 3, name: "Lagosta" },
            { id: 4, name: "Lola" },
          ]}
          selectedItems={["1","2"]}
          onSelectItems={()=>{}}
          // onAction={() => {}}
        />
      </UseCase>
    </Story>
  ))
