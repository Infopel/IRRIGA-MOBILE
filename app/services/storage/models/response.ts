import { Collection } from "@nozbe/watermelondb"
import { text, writer } from "@nozbe/watermelondb/decorators"
import Model from "@nozbe/watermelondb/Model"
import { RawRecord } from "@nozbe/watermelondb/RawRecord"

interface IRawResponse extends RawRecord {
  response: string
  form_id: string
  quiz_id: string
  field_id: string
}
export class Response extends Model {
  static table = "form_responses"
  public _raw!: IRawResponse
  @text("response") response!: string | undefined
  @text("field_id") fieldId!: string
  @text("quiz_id") quizId!: string
  @text("form_id") formId!: string
}
