import { FieldsetModel } from "./fieldset"

test("can be created", () => {
  const instance = FieldsetModel.create({
    description: "desc",
    id: 5,
    label: "label",
    controls: [],
  })

  expect(instance).toBeTruthy()
})
