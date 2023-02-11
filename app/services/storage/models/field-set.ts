import Model, { Associations } from "@nozbe/watermelondb/Model"
import { children, field, text } from "@nozbe/watermelondb/decorators"
import { Field } from "./field"
import { RawRecord } from "@nozbe/watermelondb/RawRecord"
import Query from "@nozbe/watermelondb/Query"

interface IRawFieldSet extends RawRecord {
  index: number
  description: string
  label: string
  form_id: string
  depend_on?: string
}

export class FieldSet extends Model {
  static table = "fieldsets"
  public _raw!: IRawFieldSet
  static associations: Associations = {
    forms: {
      key: "form_id",
      type: "belongs_to",
    },
    fields: {
      foreignKey: "fieldset_id",
      type: "has_many",
    },
  }
  @children("fields") fields!: Query<Field>
  @text("label")
  label!: string
  @field("index")
  index!: number
  @text("description")
  description!: string
  @text("depend_on")
  dependsOn!: string
}
