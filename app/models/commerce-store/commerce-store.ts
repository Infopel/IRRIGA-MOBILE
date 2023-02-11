import { flow, getSnapshot, Instance, SnapshotOut, types } from "mobx-state-tree"
import { QueryableFormField } from "storage/models/queryable-form-field"
import { addCommerce, addQueryField } from "storage/mutations"

/**
 * Model description here for TypeScript hints.
 */
export const CommerceStoreModel = types
  .model("CommerceStore")
  .props({})
  // .extend(withRootStore)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    afterCreate: flow(function* () {
      try {
        yield addQueryField(
          [
            {
              id: "abf1cb25-5ed6-",
              name: "Tomate",
            },
            {
              name: "Repolho",
              id: "Repolho",
            },
            { name: "Cebola", id: "10" },
            { name: "Tomate", id: "tomate" },
            { name: "Couve", id: "couve" },
            { name: "Cenoura", id: "cenoura" },
            { name: "Pepino", id: "pepino" },
            { name: "Pimento", id: "pimento" },
            { name: "Quiabo", id: "quiado" },
            { name: "Piripiri", id: "piripiri" },
            { name: "Milho bebe", id: "milho bebe" },
            { name: "Batata", id: "batata" },
            { name: "Batata reno", id: "batata reno" },
            { name: "Maçaroca", id: "macaroca" },
          ],
          QueryableFormField.fields.culture,
        )
      } catch (e: any) {
        console.tron?.error?.(e.message, e.stack)
      }
    }),
    addCommerce: flow(function* (
      cultureId: string,
      price: number,
      weight: number,
      beneficiaryId: string,
    ) {
      yield addCommerce({ price, weight, beneficiaryId, cultureId })
    }),
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

type TCommerceStore = Instance<typeof CommerceStoreModel>
export interface CommerceStore extends TCommerceStore {}
type TCommerceStoreSnapshot = SnapshotOut<typeof CommerceStoreModel>
export interface CommerceStoreSnapshot extends TCommerceStoreSnapshot {}
export const createCommerceStoreDefaultModel = () =>
  types.optional(CommerceStoreModel, getSnapshot(CommerceStoreModel.create({})))
