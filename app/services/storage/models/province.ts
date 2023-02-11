import { text } from "@nozbe/watermelondb/decorators"
import Model from "@nozbe/watermelondb/Model"

export class Province extends Model {
  static table = "provincia"
  @text("name")
  name!: string
}
