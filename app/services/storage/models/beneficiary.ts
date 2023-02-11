import { text } from "@nozbe/watermelondb/decorators"
import Model from "@nozbe/watermelondb/Model"

export class Beneficiary extends Model {
  static table = "beneficiaries"
  @text("name")
  name!: string
}
