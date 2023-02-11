import { FieldModel } from "./field"

test("can be created", () => {
  const instance = FieldModel.create({
    id: 1,
    label: "Documentos",
    type: "text",
  })

  expect(instance).toBeTruthy()
})
