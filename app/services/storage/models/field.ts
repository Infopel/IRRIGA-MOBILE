import { children, field, text } from "@nozbe/watermelondb/decorators"
import Model, { Associations } from "@nozbe/watermelondb/Model"
import Query from "@nozbe/watermelondb/Query"
import { RawRecord } from "@nozbe/watermelondb/RawRecord"
import { Option } from "./option"
import { Validation } from "./validation"

interface IRawField extends RawRecord {
  type: "text" | "dropdown" | "radio" | "chip" | "capture" | "location" | "date" | "form"
  placeholder?: string
  label: string
  depend_on?: string
  filter_id?: number
  fieldset_id?: string
  index: number
  filter_with_dropdown?:
    | "DISTRICT_BY_PROVINCE"
    | "ASSOCIACAO_POR_REGADIO"
    | "REGADIO_POR_ASSOCIACAO"
    | "REGADIO_POR_PROVINCIA"
    | "DISTRICT_BY_PROVINCE"
    | "BENEFICIARIO_POR_REGADIO"
    | "BENEFICIARIO_POR_ASSOCIACAO"
    | "BENEFICIARIO_POR_ESCOLA"
    | "OPCOES_POR_PERGUNTA"
  verify_on?: number
}

export class Field extends Model {
  static table = "fields"
  public _raw!: IRawField
  static associations: Associations = {
    validations: { foreignKey: "field_id", type: "has_many" },
    fieldsets: { key: "fieldset_id", type: "belongs_to" },
    options: { foreignKey: "field_id", type: "has_many" },
  }
  @children("validations") validations!: Query<Validation>
  @children("options") options!: Query<Option>
  @text("label") label!: string
  @field("placeholder") placeholder!: string | undefined
  @field("type") type!: IRawField["type"]
  @field("filter_with_dropdown") filterWithDropdown!: IRawField["filter_with_dropdown"]
}
