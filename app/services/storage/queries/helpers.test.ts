import { Response } from "storage/models"
import { putValueIfNotEmpty } from "../helpers/parseValue"
describe("putValueIfNotEmpty", () => {
  test("parse null value", () => {
    type Res = { egg: string }
    const res = { fieldId: "10", response: null }
    const obj: Partial<Res> = {}

    putValueIfNotEmpty(obj, (res as unknown) as Response, "egg", "10", "string")

    expect(obj.egg).toBe(undefined)
  })
  test("parse undefined value", () => {
    type Res = { egg: string }
    const RESPONSE = undefined
    const res = { fieldId: "10", response: RESPONSE }
    const obj: Partial<Res> = {}

    putValueIfNotEmpty(obj, (res as unknown) as Response, "egg", "10", "string")

    expect(obj.egg).toBe(undefined)
  })
  test("parse String value", () => {
    type Res = { egg: string }
    const RESPONSE = "Simple text"
    const res = { fieldId: "10", response: RESPONSE }
    const obj: Partial<Res> = {}

    putValueIfNotEmpty(obj, (res as unknown) as Response, "egg", "10", "string")

    expect(obj.egg).toBe(RESPONSE)
  })
  test("parse number value", () => {
    type Res = { egg: string }
    const RESPONSE = 25
    const res = { fieldId: "10", response: RESPONSE }
    const obj: Partial<Res> = {}

    putValueIfNotEmpty(obj, (res as unknown) as Response, "egg", "10", "string")

    expect(obj.egg).toBe(RESPONSE)
  })
  test("parse float value", () => {
    type Res = { egg: string }
    const RESPONSE = -32.8515131335131344
    const res = { fieldId: "10", response: RESPONSE }
    const obj: Partial<Res> = {}

    putValueIfNotEmpty(obj, (res as unknown) as Response, "egg", "10", "string")

    expect(obj.egg).toBe(RESPONSE)
  })
  test("parse boolean value", () => {
    type Res = { egg: string }
    const RESPONSE = true
    const res = { fieldId: "10", response: RESPONSE }
    const obj: Partial<Res> = {}

    putValueIfNotEmpty(obj, (res as unknown) as Response, "egg", "10", "string")

    expect(obj.egg).toBe(RESPONSE)
  })
})
