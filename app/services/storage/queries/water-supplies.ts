import { Database, Q, Query } from "@nozbe/watermelondb"
import { forms } from "api"
import { uniqBy } from "lodash"
import { groupBy, map, mergeMap, Observable, of, reduce, toArray } from "rxjs"
import { Response } from "storage/models"
import { putValueIfNotEmpty } from "../helpers/parseValue"
import { waterSupplyFields } from "./constants"
export type WaterSupplyListItem = {
  id: string
  name: string
  progress: number
  location: {
    lat: number
    lng: number
  }
}

export type WaterSupply = {
  id: string
  name: string
  currentExecution: number
  expecteExcecution: number
  currentFase: string
  temporaryDeleveryAt: number
  deliveryAt: number
  beginAt: number
  coSignedAt: number
  timeFrame: string
  fiscalContactTelephone: string
  fiscalContactName: string
  hiredContactTelephone: string
  hiredContactName: string
  entityName: string
  femaleBeneficiaries: number
  maleBeneficiaries: number
  lastMonitoredAt: number
  totalBeneficiaries: number
  area: number
  address: string
  progress: number
  location: {
    lat: number
    lng: number
  }
}

export function findAllWaterSupplies(
  database: Database,
  queryText?: string,
): Observable<WaterSupplyListItem[]> {
  return findAllResponsesWithTextSearch(database, queryText)
    .observe()
    .pipe(
      mergeMap((l) =>
        of(...l).pipe(
          groupBy((res) => res.quizId),
          toArray(),
          mergeMap((supply) =>
            findAllWaterSuppliesResponsesFromQuizId(
              database,
              supply.map((x) => x.key),
            ),
          ),
        ),
      ),
    )
}

function findAllWaterSuppliesResponsesFromQuizId(database: Database, quizIds: string[]) {
  return database
    .get<Response>(Response.table)
    .query(Q.where("quiz_id", Q.oneOf(quizIds)))
    .observe()
    .pipe(
      mergeMap((items) =>
        of(...items).pipe(
          groupBy((x) => x.quizId),
          mergeMap((q) =>
            q.pipe(
              toArray(),
              map((x) => {
                let name: string = ""
                let latitude: number = 0
                let longitude: number = 0

                let id = x[0]?.quizId
                for (const field of x) {
                  if (!field.response) break
                  if (field.fieldId === waterSupplyFields.NAME) {
                    name = field.response
                  }
                  if (field.fieldId === waterSupplyFields.LOCATION) {
                    if (longitude === 0) {
                      longitude = parseFloat(field.response)
                    } else {
                      latitude = parseFloat(field.response)
                    }
                  }
                }
                return { id, name, location: { lat: latitude, lng: longitude }, progress: 5 }
              }),
            ),
          ),
          reduce((acc, curr) => uniqBy([...acc, curr], (i) => i.id), [] as WaterSupplyListItem[]),
        ),
      ),
    )
}

function findAllResponsesWithTextSearch(database: Database, text?: string): Query<Response> {
  const query = database.collections
    .get<Response>(Response.table)
    .query(Q.where("form_id", Q.eq(forms.water_supply)))
  if (!text) return query
  return query.extend(
    Q.where("field_id", waterSupplyFields.NAME),
    Q.where("response", Q.like(`%${Q.sanitizeLikeString(text)}%`)),
  )
}

export function findWaterSupplyById(database: Database, itemId: string): Observable<WaterSupply> {
  console.log({ itemId })
  return database
    .get<Response>(Response.table)
    .query(Q.where("quiz_id", itemId))
    .observe()
    .pipe(
      map((responses) => {
        const obj: Partial<WaterSupply> = {}
        obj.id = responses[0].quizId
        for (const response of responses) {
          putValueIfNotEmpty(obj, response, "name", waterSupplyFields.NAME)
          putValueIfNotEmpty(obj, response, "address", waterSupplyFields.PROVINCE)
          putValueIfNotEmpty(obj, response, "area", waterSupplyFields.AREA, "float")
          putValueIfNotEmpty(obj, response, "beginAt", waterSupplyFields.BEGIN_AT, "float")
          putValueIfNotEmpty(obj, response, "coSignedAt", waterSupplyFields.CO_SIGNED_AT, "float")
          // putValueIfNotEmpty(obj, response, "currentExecution", waterSupplyFields.CURRENT_EXECUTION)
          // putValueIfNotEmpty(obj, response, "currentFase", waterSupplyFields.CURRENT_FASE)
          putValueIfNotEmpty(obj, response, "deliveryAt", waterSupplyFields.DELIVERY_AT, "float")
          putValueIfNotEmpty(obj, response, "entityName", waterSupplyFields.ENTITY_NAME)
          putValueIfNotEmpty(
            obj,
            response,
            "expecteExcecution",
            waterSupplyFields.EXPECTED_EXCECUTION,
          )
          putValueIfNotEmpty(
            obj,
            response,
            "femaleBeneficiaries",
            waterSupplyFields.FEMALE_BENEFICIARIES,
            "int",
          )
          putValueIfNotEmpty(
            obj,
            response,
            "fiscalContactName",
            waterSupplyFields.FISCAL_CONTACT_NAME,
          )
          putValueIfNotEmpty(
            obj,
            response,
            "fiscalContactTelephone",
            waterSupplyFields.FISCAL_CONTACT_TELEPHONE,
          )
          putValueIfNotEmpty(
            obj,
            response,
            "hiredContactName",
            waterSupplyFields.HIRED_CONTACT_NAME,
          )
          putValueIfNotEmpty(
            obj,
            response,
            "hiredContactTelephone",
            waterSupplyFields.HIRED_CONTACT_TELEPHONE,
          )
          putValueIfNotEmpty(
            obj,
            response,
            "lastMonitoredAt",
            waterSupplyFields.LAST_MONITORED_AT,
            "float",
          )
          putValueIfNotEmpty(
            obj,
            response,
            "maleBeneficiaries",
            waterSupplyFields.MALE_BENEFICIARIES,
            "int",
          )
          putValueIfNotEmpty(obj, response, "name", waterSupplyFields.NAME)
          putValueIfNotEmpty(obj, response, "progress", waterSupplyFields.PROGRESS, "float")
          putValueIfNotEmpty(
            obj,
            response,
            "temporaryDeleveryAt",
            waterSupplyFields.TEMPORARY_DELEVERY_AT,
            "float",
          )
          putValueIfNotEmpty(obj, response, "timeFrame", waterSupplyFields.TIME_FRAME)
          putValueIfNotEmpty(
            obj,
            response,
            "totalBeneficiaries",
            waterSupplyFields.TOTAL_BENEFICIARIES,
            "int",
          )
          if (response.response) {
            obj.location =
              response.fieldId === waterSupplyFields.LOCATION
                ? obj.location
                  ? { ...obj.location, lat: parseFloat(response.response) }
                  : { lng: parseFloat(response.response), lat: 0 }
                : undefined
          }
        }

        return obj as Required<WaterSupply>
      }),
    )
}
