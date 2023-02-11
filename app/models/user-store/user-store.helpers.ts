import { save, load } from "utils/storage"
import { TUserSnapshot } from "./../user/user"
export async function storeUser(user: TUserSnapshot) {
  await save("user", JSON.stringify(user))
}
export async function loadUser(): Promise<TUserSnapshot> {
  return load("user")
}
