import { forms } from "api"
import { TestScheduler } from "rxjs/testing"
import { database } from "storage/database"
import { Form } from "storage/models"
import { addOrUpdateForm } from "storage/mutations"
import {
  findAllWaterSupplies,
  findWaterSupplyById,
  WaterSupply,
  WaterSupplyListItem,
} from "../water-supplies"

let form: Form
let testScheduler: TestScheduler
beforeEach(() => {
  testScheduler = new TestScheduler((actual, expected) => {
    return expect(actual).toStrictEqual(expected)
  })
})

beforeAll(async () => {
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
              options:[]
            },
          ],
        },
      ],
    },
  ])
  form = await database.collections.get<Form>(Form.table).find(forms.water_supply)
})

describe("findAllWaterSupplies", () => {
  it("should show empty result", () => {
    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllWaterSupplies(database, "")).toEqual(hot("(a)", { a: [] }))
    })
  })

  it("should get a list with 1 item", async () => {
    const item: WaterSupplyListItem = {
      name: "Regadio Legend",
      id: "test1",
      location: {
        lat: 32.135454,
        lng: -23.21515,
      },
      progress: 90,
    }
    await form.saveForm(
      [
        { fieldId: "121", response: item["name"] },
        { fieldId: "194", response: item["location"]["lat"] + "" },
        { fieldId: "194", response: item["location"]["lng"] + "" },
      ],
      item["id"],
    )

    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllWaterSupplies(database, "")).toEqual(
        hot("(a)", {
          a: [item],
        }),
      )
    })
  })
  it("should get a list with 3 items", async () => {
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
      progress: 10,
    }
    const item3: WaterSupplyListItem = {
      name: "Regadio Emanuel",
      id: "test3",
      location: {
        lat: 32.1354554,
        lng: -23.215145,
      },
      progress: 50,
    }

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

    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllWaterSupplies(database, "")).toEqual(
        hot("(a)", {
          a: [item3, item2, item1],
        }),
      )
    })
  })
})
afterEach(() => database.write(async () => await database.unsafeResetDatabase()))

describe("findWaterSupplyById", () => {
  it("should find item from givenId", async () => {
    const item: WaterSupply = {
      name: "Regadio Emanuel",
      id: "test3",
      location: {
        lat: 32.1354554,
        lng: -23.215145,
      },
      progress: 50,
      address: "Matola",
      area: 2000,
      beginAt: Date.parse("12/05/2018"),
      deliveryAt: Date.parse("09/25/2022"),
      coSignedAt: Date.parse("09/25/2022"),
      currentExecution: 20,
      currentFase: "Construction",
      entityName: "Matola",
      expecteExcecution: 80,
      femaleBeneficiaries: 20,
      fiscalContactName: "Paulo Guteres",
      fiscalContactTelephone: "841236548",
      hiredContactName: "Joao Esteves",
      hiredContactTelephone: "821234567",
      lastMonitoredAt: Date.parse("08/05/2021"),
      maleBeneficiaries: 22,
      temporaryDeleveryAt: Date.parse("08/10/2022"),
      timeFrame: "Sei la",
      totalBeneficiaries: 42,
    }

    await form.saveForm(
      [
        { fieldId: "121", response: item["name"] },
        { fieldId: "194", response: item["location"]["lat"] + "" },
        { fieldId: "194", response: item["location"]["lng"] + "" },
      ],
      item["id"],
    )

    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findWaterSupplyById(database, item.id)).toEqual(
        hot("(a)", {
          a: item,
        }),
      )
    })
  })
})
