import { Observable } from "rxjs"
export type IBeneficiaryItem = {
  id: string
  name: string
}

export type IBeneficiary = {
  id: string
  name: string
  association: string
  waterSupply: string
  address: string
}

export type Association = {
  id: string
  name: string
  address: string
}

export type Commerce = {
  id: string
  name: Observable<string>
  price: number
  weight: number
}

export type IResponse = {
  fieldId: string
  response?: string
  quizId: string
}
