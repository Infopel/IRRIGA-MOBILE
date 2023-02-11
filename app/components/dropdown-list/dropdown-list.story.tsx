import { storiesOf } from "@storybook/react-native"
import { DropdownList } from "./dropdown-list.component"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
const options = [{ id: "1", name: "Water" }, { id: "2", name: "Orange juice" }, { id: "3", name: "Wine" }]

storiesOf("DropdownList", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Default", () => {
    console.log()
    return (
      <Story>
        <UseCase text="Primary" usage="The primary.">
          <DropdownList
            isVisible={true}
            label={"Default"}
            toggleClose={() => { }}
            selectedItems={[]}
            options={options}
            onChangeSelectedItems={() => { }}
          />
        </UseCase>
      </Story>
    )
  })
  .add("Default with Control buttons", () => {
    console.log()
    return (
      <Story>
        <UseCase text="Primary" usage="The primary.">
          <DropdownList
            isVisible={true}
            label={"Default with Control buttons"}
            toggleClose={() => { }}
            selectedItems={[]}
            options={options}
            onChangeSelectedItems={() => { }}
            isSetChangeOnComplete
          />
        </UseCase>
      </Story>
    )
  })
  .add("Selected items", () => {
    console.log()
    return (
      <Story>
        <UseCase text="Primary" usage="The primary.">
          <DropdownList
            isVisible={true}
            label={"Selected items"}
            toggleClose={() => { }}
            selectedItems={["2"]}
            options={options}
            onChangeSelectedItems={() => { }}
          />
        </UseCase>
      </Story>
    )
  })
  .add("Selected items with control buttons", () => {
    console.log()
    return (
      <Story>
        <UseCase text="Primary" usage="The primary.">
          <DropdownList
            isVisible={true}
            label={"Selected items with control buttons"}
            toggleClose={() => { }}
            selectedItems={["2"]}
            options={options}
            onChangeSelectedItems={() => { }}
            isSetChangeOnComplete
          />
        </UseCase>
      </Story>
    )
  })
