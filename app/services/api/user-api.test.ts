import { Environment } from "models/environment"
import { UserApi } from "./user-api"
jest.useFakeTimers("legacy")
describe("User Api", () => {
  it("should get signin info", async () => {
    const env = new Environment()
    await env.setup()
    const api = new UserApi(env.api)
    const response = await api.signIn("ben@irriga.com", "irriga@2022")
    await expect(response.kind).toBe("ok")
  })
  it("should get error if email is wrong", async () => {
    const env = new Environment()
    await env.setup()
    const api = new UserApi(env.api)
    const response = await api.signIn("ben@irriga.com", "wrong-password")

    await expect(response.kind).toBe("not-found")
  })
})
