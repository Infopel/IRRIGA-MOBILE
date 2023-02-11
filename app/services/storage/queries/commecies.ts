import { Database } from "@nozbe/watermelondb"
import { Observable, of, zipAll } from "rxjs"
import {
  map,
  mergeMap,
  exhaustMap,
  exhaustAll,
  switchAll,
  mergeAll,
  scan,
  switchMap,
} from "rxjs/operators"
import { Commerce } from "storage/models/commerce"
import { Commerce as TCommerce } from "./types"

export function findAllCommerciesInDescentOrder(database: Database): Observable<TCommerce[]> {
  return database
    .get<Commerce>(Commerce.table)
    .query()
    .observe()
    .pipe(
      map((list) =>
        list.map(({ id, price, weight, queryField, _raw }) => {
          return {
            id,
            price,
            weight,
            name: queryField.observe().pipe(map((v) => v.name)),
          }
        }),
      ),
    )
}

export function findAllAgregatedCommercies(database: Database): Observable<TCommerce[]> {
  return database
    .get<Commerce>(Commerce.table)
    .query()
    .observe()
    .pipe(
      map((list) =>
        list.map(({ id, price, weight, queryField, _raw }) => {
          return {
            id,
            price,
            weight,
            name: queryField.observe().pipe(map((v) => v.name)),
          }
        }),
      ),
    )
}

function reduceList(list: TCommerce[]) {
  return list.reduce((acc, item) => {
    const current = acc.find((i) => i.id)
    if (!current) {
      acc.push(item)
      return acc
    }
    current.price += item.price
    current.weight += item.weight
    return acc
  }, [] as TCommerce[])
}
