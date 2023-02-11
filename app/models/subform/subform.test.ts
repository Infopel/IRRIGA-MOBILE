import { SubformModel } from "./subform"

test("can be created", () => {
  const instance = SubformModel.create({
    id: "sad",
    labelField:'asdsad',
    output:[]
  })

  expect(instance).toBeTruthy()
})
