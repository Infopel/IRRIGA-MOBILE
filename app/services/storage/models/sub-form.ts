import { RawRecord } from "@nozbe/watermelondb"
import { immutableRelation } from "@nozbe/watermelondb/decorators"
import Model from "@nozbe/watermelondb/Model"
import Query from "@nozbe/watermelondb/Query"
import { Form } from "./form"

interface IRawSubForm extends RawRecord {
  main_id: string
  form_id: string
  main_form_field_id: string
}

export class Subform extends Model {
  static table = "sub_forms"
//   static associations = {
//     forms: { type: "belongs_to", key: "main_id" },
//     forms: { type: "belongs_to", key: "form_id" },
//   }
//   @immutableRelation("forms", "form_id") main!: Query<Form>
//   @immutableRelation("forms", "main_id") subform!: Query<Form>
  public _raw!: IRawSubForm
}
