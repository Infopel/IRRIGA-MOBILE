import { text } from "@nozbe/watermelondb/decorators"
import Model from "@nozbe/watermelondb/Model"

export class WaterSupply extends Model {
  static table = "regadio"
  @text("designacao")
  name!: string
}
