import { FilterControlWithIdResult, GetRawFilterControlWithIdResult } from "../api.types"

export function parseGetRawFilterControlWithIdResult(
  input: GetRawFilterControlWithIdResult,
): FilterControlWithIdResult {
  const _list = input ?? []
  const list: { id: number; name: string }[] = []
  for (const { id, name } of _list) {
    list.push({ id, name })
  }
  return { list }
}
