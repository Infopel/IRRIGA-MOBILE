import { storiesOf } from "@storybook/react-native"
import { NativeBaseProvider } from "native-base"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { theme } from "../../theme/theme"
import { BeneficiaryInfo } from "./beneficiary-info.component"

storiesOf("BeneficiaryInfo", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
          <BeneficiaryInfo />
      </UseCase>
    </Story>
  ))
