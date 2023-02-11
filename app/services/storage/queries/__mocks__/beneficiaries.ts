import { Database } from "@nozbe/watermelondb"
import { Observable, of } from "rxjs"
import { startWith } from "rxjs/operators"
import { Association, IBeneficiaryItem } from "./../types"

export function findAllBeneficiariesAndAssociations(
  database: Database,
  text?: string,
): Observable<IBeneficiaryItem[] | Association[]> {
  const beneficiaries = findAllBeneficiaries(database, text)
  //   const associatibs = findAllAssociations(database, text)

  return beneficiaries.pipe(startWith([]))
}
function findAllBeneficiaries(database: Database, text?: string): Observable<IBeneficiaryItem[]> {
  const beneficiaries: IBeneficiaryItem[] = [
    {
      id: "wqewewq",
      name: "Paulo amorim",
    },
    {
      id: "aldas;dsla,d",
      name: "Artur Braga",
    },
  ]
  return of(beneficiaries)
}

function findAllAssociations(
  database: Database,
  text?: string,
): Observable<IBeneficiaryItem | Association> {
  throw new Error("Function not implemented.")
}
