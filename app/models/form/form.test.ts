import { FormModel } from "./form"

test("can be created", () => {
  const instance = FormModel.create({
    id:"id",
    name: 'name',
    fieldset:[]
  })

  expect(instance).toBeTruthy()
})
