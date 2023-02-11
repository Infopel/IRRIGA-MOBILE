import { storiesOf } from "@storybook/react-native"
import { CloseIcon, HStack, Input } from "native-base"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { MultiSelect } from "./multi-select.component"
const options = [{ id: "1", name: "Blue wale" }, { id: "2", name: "Blowfish" }, { id: "3", name: "Mantis shrimp" }, { id: "4", name: "Seahorse" }]
const selecetedItems = [options[1], options[2]]
storiesOf("MultiSelect", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Default", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <MultiSelect m='2' label="Default" onSelectItems={() => { }} options={options} selectedItems={[]} />
      </UseCase>
    </Story>
  ))
  .add("Default with no options", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <MultiSelect m='2' label="Default" onSelectItems={() => { }} options={[]} selectedItems={[]} />
      </UseCase>
    </Story>
  ))
  .add("Selected Items", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <MultiSelect m='2' label="Default" onSelectItems={() => { }} options={options} selectedItems={selecetedItems} />
      </UseCase>
    </Story>
  ))
  .add("Comparizon with Input component", () => (
    <Story>
      <UseCase text="Empty" usage="The primary.">
        <HStack >
          <MultiSelect w='md' m='2' label="Default" onSelectItems={() => { }} options={[]} selectedItems={[]} />
          <Input m='2' w='md' placeholder="Simple element" rightElement={<CloseIcon />} />
        </HStack>
      </UseCase>
      <UseCase text="Default" usage="The primary.">
        <HStack>
          <MultiSelect w='md' m='2' label="Default" onSelectItems={() => { }} options={options} selectedItems={selecetedItems} />
          <Input m='2' w='md' placeholder="Simple element" rightElement={<CloseIcon />} />
        </HStack>
      </UseCase>

    </Story>
  ))
