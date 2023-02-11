import { field, relation } from "@nozbe/watermelondb/decorators"
import Model, { Associations } from "@nozbe/watermelondb/Model"
import { Beneficiary } from "./beneficiary"
import { QueryableFormField } from "./queryable-form-field"

export class Commerce extends Model {
  static table = "commerces"
  static associations: Associations = {
    beneficiaries: {
      key: "beneficiary_id",
      type: "belongs_to",
    },
    fields: {
      key: "query_field_id",
      type: "belongs_to",
    },
  }
  @field("weight")
  weight!: number
  @field("price")
  price!: number
  @relation(Beneficiary.table, "beneficiary_id")
  beneficiary!: Beneficiary
  @relation(QueryableFormField.table, "query_field_id")
  queryField!: QueryableFormField
}
