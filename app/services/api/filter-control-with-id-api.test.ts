import { Environment } from "models"
import { QueryFilterApi } from "./filter-control-with-id-api"
jest.useFakeTimers("legacy")

describe("Form Api", () => {
  it("should receive district form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new QueryFilterApi(env.api)
    const response = await api.filterWithId("5")

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive a not found from api", async () => {
    const env = new Environment()
    await env.setup()

    const api = new QueryFilterApi(env.api)
    const response = await api.filterWithId("500")

    await expect(response.kind).toBe("not-found")
    //@ts-expect-errors
    await expect(response.result).toBeFalsy()
  })
})
