// jest.useFakeTimers("legacy")
import { first, last } from "lodash"
import { TestScheduler } from "rxjs/testing"
import { database } from "storage"
import { findAllBeneficiariesAndAssociations, findBeneficiariesDetailsById } from "../beneficiaries"
import { beneficiariesFields } from "../constants"
import {
  getBeneficiaryDetailsResponse,
  populateBeneficiaryDetails,
  populateSimpleForm,
} from "./prepare.beneficiaries"
describe("findAllBeneficiariesAndAssociations", () => {
  let testScheduler: TestScheduler
  beforeEach(() => {
    testScheduler = new TestScheduler((actual, expected) => {
      return expect(actual).toStrictEqual(expected)
    })
  })

  it("should show empty result", () => {
    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllBeneficiariesAndAssociations(database, "")).toEqual(
        hot("(a)", { a: [] }),
      )
    })
  })

  it("should get a list with 1 beneficiaries", async () => {
    const { district, locality, province, adminPost } = {
      district: { name: "Moamba", id: "20" },
      province: { name: "Maputo Provincia", id: "230" },
      adminPost: "Posto de Chibababua",
      locality: "Localidate Chumada",
    }
    const item = {
      name: "Paulo Augusto",
      id: "test1",
    }
    const nameList = item["name"].split(" ")
    const firstName = first(nameList)
    const lastName = last(nameList)

    const form = await populateSimpleForm()
    await form.saveForm(
      [
        { fieldId: beneficiariesFields.FIRST_NAME, response: firstName },
        { fieldId: beneficiariesFields.LAST_NAME, response: lastName },
        { fieldId: beneficiariesFields.PROVINCE, response: province.id },
        { fieldId: beneficiariesFields.DISTRICT, response: district.id },
        { fieldId: beneficiariesFields.LOCALITY, response: locality },
        { fieldId: beneficiariesFields.ADMIN_POST, response: adminPost },
      ],
      item["id"],
    )

    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllBeneficiariesAndAssociations(database, "")).toEqual(
        hot("(a)", {
          a: [item],
        }),
      )
    })
  })
  it("should get a list with 3 beneficiaries", async () => {
    const item1 = { name: "Paulo Augusto", id: "test1" }
    const item2 = { name: "Marcos Malagueta", id: "test2" }
    const item3 = { name: "António Marcos", id: "test3" }
    const form = await populateSimpleForm()
    for (const item of [item1, item2, item3]) {
      const nameList = item["name"].split(" ")
      const firstName = first(nameList)
      const lastName = last(nameList)

      await form.saveForm(
        [
          { fieldId: "1", response: firstName },
          { fieldId: "2", response: lastName },
        ],
        item["id"],
      )
    }

    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllBeneficiariesAndAssociations(database, "")).toEqual(
        hot("(a)", {
          a: [item3, item2, item1],
        }),
      )
    })
  })

  afterEach(() => database.write(async () => await database.unsafeResetDatabase()))

  it("Should get beneficiary details from id", async () => {
    const result = getBeneficiaryDetailsResponse()
    await populateBeneficiaryDetails()

    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findBeneficiariesDetailsById(database, result.id)).toEqual(
        hot("(a)", {
          a: result,
        }),
      )
    })
  })
})
