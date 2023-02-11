import { forms } from "api"
import * as React from "react"
import { database, resetDatabase } from "storage/database"
import { Form } from "storage/models/form"
import { addOrUpdateForm } from "storage/mutations"
import { WaterSupplyListItem } from "storage/queries/water-supplies"
import { fireEvent, render, waitFor, within } from "test-utils"
import { RegadiosList } from "./regadios-list.component"

test("should empty list message", async () => {
  const { debug, queryByText } = render(<RegadiosList />)
  await waitFor(() => {
    expect(queryByText("Lista Vazia")).toBeTruthy()
  })
})
test("should 3 items on list", async () => {
  const item1: WaterSupplyListItem = {
    name: "Bruno e Filhos",
    id: "test1",
    location: {
      lat: 32.135455324,
      lng: -23.21512315,
    },
    progress: 5,
  }
  const item2: WaterSupplyListItem = {
    name: "Regadio de Moamba",
    id: "test2",
    location: {
      lat: 32.13235454,
      lng: -23.2154315,
    },
    progress: 5,
  }
  const item3: WaterSupplyListItem = {
    name: "Regadio Emanuel",
    id: "test3",
    location: {
      lat: 32.1354554,
      lng: -23.215145,
    },
    progress: 5,
  }
  await addOrUpdateForm(database, [
    {
      id: forms.water_supply,
      name: "Simple Form",
      fieldset: [
        {
          id: 1,
          label: "First Page",
          description: "First page description",
          controls: [
            {
              id: "1",
              label: "First Name",
              type: "text",
              placeholder: "First Name",
            },
          ],
        },
      ],
    },
  ])
  const form = await database.collections.get<Form>(Form.table).find(forms.water_supply)

  for (const item of [item1, item2, item3]) {
    await form.saveForm(
      [
        { fieldId: "121", response: item["name"] },
        { fieldId: "194", response: item["location"]["lat"] + "" },
        { fieldId: "194", response: item["location"]["lng"] + "" },
      ],
      item["id"],
    )
  }
  const { queryByText, debug, findByText } = render(<RegadiosList />)
  await waitFor(() => {
    expect(queryByText("Lista Vazia")).toBeFalsy()
  })
  expect(queryByText(item1.name)).toBeTruthy()
  expect(queryByText(item2.name)).toBeTruthy()
  expect(queryByText(item3.name)).toBeTruthy()
})
test("should open menu on item click", async () => {
  const item1: WaterSupplyListItem = {
    name: "Bruno e Filhos",
    id: "test1",
    location: {
      lat: 32.135455324,
      lng: -23.21512315,
    },
    progress: 5,
  }
  const item2: WaterSupplyListItem = {
    name: "Regadio de Moamba",
    id: "test2",
    location: {
      lat: 32.13235454,
      lng: -23.2154315,
    },
    progress: 5,
  }
  await addOrUpdateForm(database, [
    {
      id: forms.water_supply,
      name: "Simple Form",
      fieldset: [
        {
          id: 1,
          label: "First Page",
          description: "First page description",
          controls: [
            {
              id: "1",
              label: "First Name",
              type: "text",
              placeholder: "First Name",
            },
          ],
        },
      ],
    },
  ])
  const form = await database.collections.get<Form>(Form.table).find(forms.water_supply)

  for (const item of [item1, item2]) {
    await form.saveForm(
      [
        { fieldId: "121", response: item["name"] },
        { fieldId: "194", response: item["location"]["lat"] + "" },
        { fieldId: "194", response: item["location"]["lng"] + "" },
      ],
      item["id"],
    )
  }
  const { getByText, getByAccessibilityState } = render(<RegadiosList />)
  fireEvent.press(getByText(item1.name))
  const bottomSheet = within(getByAccessibilityState({ expanded: true }))

  await waitFor(() => expect(bottomSheet.queryByText(item1.name)).toBeTruthy())
})

afterEach(resetDatabase)
