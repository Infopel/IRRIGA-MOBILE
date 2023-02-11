import {
  AuthResult,
  GetAuthResult,
  GetUserResult,
  RawGetAuthResult,
  RawGetUserResult,
  User,
} from "../api.types"

export function parseSignIn(input: RawGetAuthResult): AuthResult {
  const { role, username } = input.user[0]
  
  return {
    //@ts-expect-error
    role,
    username,
  }
}
export function parseGetUser(input: RawGetUserResult): User {
  //@ts-expect-error
  return input
}
