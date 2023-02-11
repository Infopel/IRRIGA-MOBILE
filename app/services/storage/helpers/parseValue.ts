import { IResponse } from "storage"
type Primitive = "string" | "int" | "float" | "boolean"

export function putValueIfNotEmpty<T extends any, K extends keyof T>(
  obj: T,
  response: IResponse,
  key: K,
  matchingField: string,
  responseType: Primitive  = "string",
) {
  if (response.fieldId !== matchingField || !response.response) return

  let result = undefined

  switch (responseType) {
    case "boolean":
      result = response.response === "true" ? true : false
      break
    case "int":
      result = parseInt(response.response)
      break
    case "float":
      result = parseFloat(response.response)
      break

    default:
      result = response.response
      break
  }
  if (result) {
    //@ts-ignore
    obj[key] = result
  }
}
