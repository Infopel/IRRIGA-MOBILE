// jest.useFakeTimers("legacy")

import { uniqWith } from "lodash"
import { of } from "rxjs"
import { TestScheduler } from "rxjs/testing"
import { database } from "storage"
import { Commerce } from "storage/models/commerce"
import { QueryableFormField } from "storage/models/queryable-form-field"
import { findAllAgregatedCommercies, findAllCommerciesInDescentOrder } from "../commecies"
import { Commerce as TCommerce } from "../types"

describe("Commercies Queries", () => {
  let testScheduler: TestScheduler
  const a = { name: "Banana", id: "test2", commerceId: "www", price: 200, weight: 500 }
  const b = { name: "Tomate", id: "test1", commerceId: "zzz", price: 200, weight: 500 }
  const c = { name: "Tomate", id: "test1", commerceId: "yyy", price: 500, weight: 200 }

  function fixObj({ commerceId, name, price, weight }: typeof a): TCommerce {
    return { id: commerceId, name: of(name), price, weight }
  }

  async function addCommercies() {
    await database.write(async () => {
      const list = [a, b, c]
      const nonReapetedList = uniqWith(list, (a, b) => a.id === b.id)

      return await database.batch(
        ...nonReapetedList.map((l) =>
          database.collections
            .get<QueryableFormField>(QueryableFormField.table)
            .prepareCreate((record) => {
              record.name = l.name
              record.field_id = l.id
              record._raw.id = l.id
            }),
        ),
        ...list.map((l) =>
          database.collections.get<Commerce>(Commerce.table).prepareCreate((record) => {
            //@ts-ignore
            record._raw.query_field_id = l.id
            //@ts-ignore
            record._raw.beneficiary_id = 5 + ""
            record.price = l.price
            record.weight = l.weight
            record._raw.id = l.commerceId
          }),
        ),
      )
    })
  }

  beforeEach(async () => {
    testScheduler = new TestScheduler((actual, expected) => {
      return expect(actual).toStrictEqual(expected)
    })
  })

  afterEach(async () => await database.write(async () => await database.unsafeResetDatabase()))

  it("should return and empty descendent list of there are no items on recent items", () => {
    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllCommerciesInDescentOrder(database)).toEqual(
        hot("(a)", {
          a: [],
        }),
      )
    })
  })
  it("should return and empty descendent list of there are no items on agregate", () => {
    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllCommerciesInDescentOrder(database)).toEqual(
        hot("(a)", {
          a: [],
        }),
      )
    })
  })

  it("should list all 3 items commercies in agragate fashion", async () => {
    await addCommercies()

    function mapResult(list: TCommerce[]) {
      return list.reduce((acc, item) => {
        const current = acc.find((i) => i.id)
        if (!current) {
          acc.push(item)
          return acc
        }
        current.price += item.price
        current.weight += item.weight
        return acc
      }, [] as TCommerce[])
    }

    return testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllAgregatedCommercies(database)).toEqual(
        hot("c", {
          c: mapResult([fixObj(a), fixObj(b), fixObj(c)]),
        }),
      )
    })
  })
  it("should list 2 items in descent order", async () => {
    await addCommercies()
    testScheduler.run(({ expectObservable, hot }) => {
      expectObservable(findAllCommerciesInDescentOrder(database)).toEqual(
        hot("c", {
          c: [fixObj(a), fixObj(b), fixObj(c)],
        }),
      )
    })
  })
})
