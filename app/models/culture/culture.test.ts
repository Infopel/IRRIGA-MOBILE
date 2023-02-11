import { CultureModel } from "./culture"

test("can be created", () => {
  const instance = CultureModel.create({
    id: "id",
    name: "name",
  })

  expect(instance).toBeTruthy()
})
