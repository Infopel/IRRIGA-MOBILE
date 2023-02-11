import { Environment } from "models"
import { FormApi } from "./form-api"
jest.useFakeTimers("legacy")

describe("Form Api", () => {
  it("should receive beneficiary form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("beneficiary"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive water_supply form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("water_supply"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive farm_tools_distribuition form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("farm_tools_distribuition"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })

  it("should receive Formation construction form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("formation"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive farm_school_register construction form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("farm_school_register"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive farm_school_monitoring construction form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("farm_school_monitoring"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive water_supply_contruction_monitoring construction form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("water_supply_contruction_monitoring"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive water_supply_constuction_fiscalization form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("water_supply_constuction_fiscalization"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive agro_commerce_monitoring form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("agro_commerce_monitoring"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive agro_income_monitoring form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("agro_income_monitoring"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })
  it("should receive satisfaction_evaluation form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("satisfaction_evaluation"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })

  it("should receive farm_school_register form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("farm_school_register"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })

  it("should receive farm_school_monitoring form output", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm(FormApi.mapForm("farm_school_monitoring"))

    await expect(response.kind).toBe("ok")
    //@ts-expect-errors
    await expect(response.result).toBeTruthy()
  })

  it("receives a not found message", async () => {
    const env = new Environment()
    await env.setup()

    const api = new FormApi(env.api)
    const response = await api.getForm("sadasd")

    await expect(response.kind).toBe("not-found")
    //@ts-expect-errors
    await expect(response.result).toBeFalsy()
  })
})
