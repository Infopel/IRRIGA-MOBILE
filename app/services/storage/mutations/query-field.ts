import { Q } from "@nozbe/watermelondb"
import { differenceWith } from "lodash"
import { database } from "storage/database"
import { QueryableFormField } from "storage/models/queryable-form-field"

export type QueryField = { id: string; name: string }

export async function addQueryField(list: QueryField[], fieldId: string) {
  return await database.write(async () => {
    const existent = await database
      .get<QueryableFormField>(QueryableFormField.table)
      .query(
        Q.and(
          Q.where("field_id", Q.eq(fieldId)),
          Q.where("value", Q.oneOf(list.map(({ id }) => id))),
        ),
      )
      .fetch()

    const nonExistent = differenceWith(list, existent, (l, ex) => l.id === ex.value)

    return await database.batch(
      ...nonExistent.map(({ id, name }) =>
        database.collections
          .get<QueryableFormField>(QueryableFormField.table)
          .prepareCreate((record) => {
            record.name = name
            record.field_id = fieldId
            record.value = id
          }),
      ),
    )
  })
}
