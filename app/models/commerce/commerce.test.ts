import { CommerceModel } from "./commerce"

test("can be created", () => {
  const instance = CommerceModel.create({})

  expect(instance).toBeTruthy()
})
