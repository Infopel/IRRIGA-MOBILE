import { storiesOf } from "@storybook/react-native"
import * as React from "react"
import { Story, StoryScreen, UseCase } from "../../../storybook/views"
import { DashboardSearchListItem } from "./dashboard-search-list-item.component"

storiesOf("DashboardSearchListItem", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <DashboardSearchListItem
          item={{
            id: "1",
            address: "Maputo, Bairro Ferroviário",
            assoiation: "Matavel",
            cultures: [
              { id: 1, name: "Banana" },
              { id: 1, name: "Couve" },
            ],
            name: "Paulo Martelo",
            waterSupplier: "FIPAG",
          }}
        />
      </UseCase>
    </Story>
  ))
