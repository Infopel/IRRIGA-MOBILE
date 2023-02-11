import Model, { Associations } from "@nozbe/watermelondb/Model"
import { field, text } from "@nozbe/watermelondb/decorators"
import { RawRecord } from "@nozbe/watermelondb"

interface IRawValidation extends RawRecord {
  required: boolean
  field_id: string
  min: number
  max: number
  content_type:
    | "tel"
    | "date"
    | "textarea"
    | "month"
    | "time"
    | "null"
    | "number"
    | "money"
    | "image/*"
    | "paper-entity-code"
}

export class Validation extends Model {
  static table = "validations"
  public static associations: Associations = {
    fields: {
      type: "belongs_to",
      key: "field_id",
    },
  }
  public _raw!: IRawValidation
  @field("required") required!: boolean
  @field("field_id") fieldId!: string
  @field("min") min!: number
  @field("max") max!: number
  @text("content_type") contentType!: IRawValidation['content_type']
}
