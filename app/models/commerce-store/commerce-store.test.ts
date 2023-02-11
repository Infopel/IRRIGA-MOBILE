import { CommerceStoreModel } from "./commerce-store"

test("can be created", () => {
  const instance = CommerceStoreModel.create({})

  expect(instance).toBeTruthy()
})
