import { text } from "@nozbe/watermelondb/decorators"
import Model from "@nozbe/watermelondb/Model"

export class Association extends Model {
  static table = "associacao"
  @text("designacao")
  name!: string
}
