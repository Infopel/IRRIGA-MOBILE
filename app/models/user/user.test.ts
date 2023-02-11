import { UserModel } from "./user"

test("can be created", () => {
  const instance = UserModel.create({
    email: "john@mail.com",
    name: "John Cena",
    role:'regadio'
  })

  expect(instance).toBeTruthy()
})
