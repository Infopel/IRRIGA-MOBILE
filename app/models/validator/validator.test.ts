import { ValidatorModel } from "./validator"

test("can be created", () => {
  const instance = ValidatorModel.create({
    required: false,
  })

  expect(instance).toBeTruthy()
})
