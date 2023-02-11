import { Query, RawRecord } from "@nozbe/watermelondb"
import { children, field, text } from "@nozbe/watermelondb/decorators"
import Model, { Associations } from "@nozbe/watermelondb/Model"
import { FieldSet } from "./field-set"
import { Response } from "./response"

type PrimitiveRes = string | number | boolean | null | undefined
type FormRes = PrimitiveRes | PrimitiveRes[]
interface IRawForm extends RawRecord {
  name: string
  version: number
}
export class Form extends Model {
  static table = "forms"
  public static associations: Associations = {
    fieldsets: { foreignKey: "form_id", type: "has_many" },
  }
  public _raw!: IRawForm
  @children("fieldsets") fieldsets!: Query<FieldSet>
  @text("name") name!: string
  @field("version") version!: number

  async saveForm(responses: { response: FormRes; fieldId: string | number }[], quizId: string) {
    await this.database.write(() => {
      const responseTable = this.database.get<Response>(Response.table)
      return this.batch(
        ...responses.map(({ fieldId, response }) =>
          responseTable.prepareCreate((record) => {
            record.response = response ? response.toString() : undefined
            record.fieldId = fieldId + ""
            record.quizId = quizId
            record.formId = this.id
          }),
        ),
      )
    })
  }
}
