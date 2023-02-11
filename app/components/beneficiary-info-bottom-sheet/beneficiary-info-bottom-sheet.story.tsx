import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { BeneficiaryInfoBottomSheet } from "./beneficiary-info-bottom-sheet.component"

storiesOf("BeneficiaryInfoBottomSheet", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Visible", (state, setState) => {
    // setState({ isVisible: true })
    return (
      <Story>
        <UseCase text="Primary" usage="The primary.">
          {/* <BeneficiaryInfoBottomSheet
            isVisible={state.isVisible}
            onClose={() => {
              setState({ isVisible: false })
            }}
            item={{
              address: "Cabo Delgado, Mocimbua da Praia",
              assoiation: "Associação Mutola",
              id: "sdfsfdsfdsfh",
              name: "Paulo Zucula",
              waterSupplier: "Clandestine Services",
              cultures: [
                { id: 1, name: "Cha" },
                { id: 1, name: "Girassol" },
              ],
            }}
          /> */}
        </UseCase>
      </Story>
    )
  })
