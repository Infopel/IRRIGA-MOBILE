import { Database, Q, Query } from "@nozbe/watermelondb"
import { forms } from "api"
import { uniqBy } from "lodash"
import { Observable, of, reduce, switchMap } from "rxjs"
import { groupBy, map, mergeMap, toArray } from "rxjs/operators"
import {
  parseBeneficiaryDetailsFromResponses,
  parseBeneficiaryFromResponses,
} from "storage/helpers/parseBeneficiary"
import { Option } from "storage/models"
import { Response } from "../../storage/models/response"
import { beneficiariesFields } from "./constants"
import { Association, IBeneficiary, IBeneficiaryItem, IResponse } from "./types"

export function findAllBeneficiariesAndAssociations(
  database: Database,
  text?: string,
): Observable<IBeneficiaryItem[] | Association[]> {
  const beneficiaries = findAllBeneficiariesItem(database, text)
  return beneficiaries
}
function findAllBeneficiariesItem(
  database: Database,
  text?: string,
): Observable<IBeneficiaryItem[]> {
  return findAllResponsesWithTextSearch(database, text)
    .observe()
    .pipe(
      mergeMap((l) =>
        of(...l).pipe(
          groupBy((res) => res.quizId),
          toArray(),
          mergeMap((bens) =>
            findAllBeneficiariesByQuizId(
              database,
              bens.map((x) => x.key),
            ),
          ),
        ),
      ),
    )
}

function findAllAssociations(
  database: Database,
  text?: string,
): Observable<IBeneficiaryItem | Association> {
  throw new Error("Function not implemented.")
}

function findAllBeneficiariesByQuizId(
  database: Database,
  quizIds: string[],
): Observable<IBeneficiaryItem[]> {
  return database.collections
    .get<Response>(Response.table)
    .query(Q.where("quiz_id", Q.oneOf(quizIds)))
    .observe()
    .pipe(
      mergeMap((items) =>
        of(...items).pipe(
          groupBy((x) => x.quizId),
          mergeMap((q) => q.pipe(toArray(), map(parseBeneficiaryFromResponses))),
          reduce((acc, curr) => uniqBy([...acc, curr], (i) => i.id), [] as IBeneficiaryItem[]),
        ),
      ),
    )
}
export function findBeneficiariesDetailsById(
  database: Database,
  quizId: string,
): Observable<IBeneficiary> {
  const optionCollection = database.get<Option>(Option.table)
  return database.collections
    .get<Response>(Response.table)
    .query(Q.where("quiz_id", Q.eq(quizId)))
    .observe()
    .pipe(
      map((list) =>
        list.map(async (x) => {
          const response: IResponse = {
            fieldId: x.fieldId,
            quizId: x.quizId,
            response: x.response,
          }
          if (
            x.response &&
            [
              beneficiariesFields.WATER_SUPPLY,
              beneficiariesFields.DISTRICT,
              beneficiariesFields.PROVINCE,
            ].includes(x._raw.field_id)
          ) {
            const res = await optionCollection
              .query(Q.and(Q.where("field_id", x.fieldId), Q.where("code", x.response)))
              .fetch()
            response.response = res[0]?.name
          }
          return response
        }),
      ),
      switchMap((x) => Promise.all(x)),

      map(parseBeneficiaryDetailsFromResponses),
    )
}
function findAllResponsesWithTextSearch(database: Database, text?: string): Query<Response> {
  const query = database.collections
    .get<Response>(Response.table)
    .query(Q.where("form_id", Q.eq(forms.beneficiary)))
  if (!text) return query
  return query.extend(
    Q.or(
      Q.and(
        Q.where("field_id", beneficiariesFields.FIRST_NAME),
        Q.where("response", Q.like(`%${Q.sanitizeLikeString(text)}%`)),
      ),

      Q.and(
        Q.where("field_id", beneficiariesFields.LAST_NAME),
        Q.where("response", Q.like(`%${Q.sanitizeLikeString(text)}%`)),
      ),
    ),
  )
}
