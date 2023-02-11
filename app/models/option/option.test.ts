import { OptionModel } from "./option"

test("can be created", () => {
  const instance = OptionModel.create({
    id: 1,
    name: "test",
  })

  expect(instance).toBeTruthy()
})
