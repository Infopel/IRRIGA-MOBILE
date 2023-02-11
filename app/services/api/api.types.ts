import { GeneralApiProblem } from "./api-problem"

export interface User {
  id: number
  name: string
}

export interface AuthResult {
  username: string
  role: "regadio" | "beneficiary"
}

export interface FormResult {
  main: FormContent
  others: FormContent[]
}
export type RawFormResult = {
  form: FormContent[]
}
export type RawGetAuthResult = { user: Login[] }
export type RawGetUserResult = GetUserResult

export type GetUserResult = { kind: "ok"; result: User } | GeneralApiProblem
export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetAuthResult = { kind: "ok"; result: AuthResult } | GeneralApiProblem

export type GetFormBody = { formId: string }
export type GetFormResponse = FormContent
export type GetFormResult = { kind: "ok"; result: FormResult } | GeneralApiProblem

export type GetFilterControlWithIdBody = {}
export type GetFilterControlWithIdResult =
  | { kind: "ok"; result: FilterControlWithIdResult }
  | GeneralApiProblem
export type FilterControlWithIdResult = { list: Item[] }
type Item = { name: string; id: number }

export type GetRawFilterControlWithIdResult = Item[]


export interface Province {
  name: string
  id: number
  districts: District[]
}

export interface District {
  name: string
  id: number
}

export interface FormContent {
  id: string
  name: string
  fieldset: Fieldset[]
}

export interface Fieldset {
  id: number
  label: string
  description: string
  controls: Control[]
}

export interface Control {
  id: number
  label: string
  value: null
  type: string
  placeholder: null | string
  options: Option[]
  validators: Validators
}

export interface Option {
  id: number
  name: string
  value: null
}

export interface Validators {
  required: boolean
  min: number
  max: number
  contentType: null | string
}

export interface Login {
  id: string
  username: string
  role: string
  menus: Menu[]
  regadios: Regadio[]
}

export interface Menu {
  id: number
  name: string
}

export interface Regadio {
  id: number
  name: string
}

export interface GetUser {}
