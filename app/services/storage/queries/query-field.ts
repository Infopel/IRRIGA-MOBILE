import { Database, Q } from "@nozbe/watermelondb"
import { Observable } from "rxjs"
import { QueryableFormField } from "storage/models/queryable-form-field"

export function findAllQueryFieldFrom(
  database: Database,
  queryFieldId: string,
): Observable<QueryableFormField[]> {
  return database
    .get<QueryableFormField>(QueryableFormField.table)
    // .query(Q.where("field_id", Q.eq(queryFieldId)))
    .query()
    .observe()
}
