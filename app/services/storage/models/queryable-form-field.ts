import { field, text } from "@nozbe/watermelondb/decorators"
import Model from "@nozbe/watermelondb/Model"

export class QueryableFormField extends Model {
  static table = "queryable_form_fields"
  static fields = {
    culture: 50+"",
  }
  @text("field_id")
  field_id!: string
  @text("name")
  name!: string
  @field("value")
  value!: string
}
