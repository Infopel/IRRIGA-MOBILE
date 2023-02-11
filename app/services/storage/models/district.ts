import { text } from "@nozbe/watermelondb/decorators"
import Model from "@nozbe/watermelondb/Model"

export class District extends Model {
  static table = "distrito"
  @text("name")
  name!: string
}
