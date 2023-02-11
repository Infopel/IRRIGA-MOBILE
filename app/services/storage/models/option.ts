import { text } from "@nozbe/watermelondb/decorators"
import Model, { Associations } from "@nozbe/watermelondb/Model"
import { RawRecord } from "@nozbe/watermelondb/RawRecord"

interface IRawOption extends RawRecord {
  name: string
  field_id: string
  code: string
}

export class Option extends Model {
  static table = "options"
  public static associations: Associations = {
    fields: {
      type: "belongs_to",
      key: "field_id",
    },
  }
  public _raw!: IRawOption
  @text("name")
  name!: string
}
