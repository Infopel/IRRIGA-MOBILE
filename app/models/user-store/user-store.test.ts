import { getSnapshot } from "mobx-state-tree"
import { Environment } from "../environment"
import { UserStoreModel } from "./user-store"

test("can be created", () => {
  const instance = UserStoreModel.create({})

  expect(instance).toBeTruthy()
})

test("should set user value and status to signedIn if signedIn", async () => {
  const env = new Environment()
  await env.setup()
  const instance = UserStoreModel.create({}, env)
  await instance.signIn("ben@irriga.com", "irriga@2022")
  expect(instance.user).toBeTruthy()
  expect(instance.error).toBeFalsy()

  expect(instance.status).toEqual("signedIn")
})

test("show show no user password error if password is invalid", async () => {
  const env = new Environment()
  await env.setup()
  const instance = UserStoreModel.create({}, env)
  await instance.signIn("paulo@mail.com", "Qwerty")//wrong password
  expect(instance.user).toBeFalsy()

  expect(instance.status).toEqual("signedOut")
  expect(instance.error).toBeTruthy()
})

test("should have an environment on create", () => {
  const instance = UserStoreModel.create({}, new Environment())
  expect(instance.environment.constructor.name).toEqual("Environment")
  expect(instance.environment.api).toBeTruthy()
})
