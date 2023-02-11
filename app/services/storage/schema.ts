import { appSchema, tableSchema } from "@nozbe/watermelondb"
import { Association } from "./models/association"
import { Beneficiary } from "./models/beneficiary"
import { Commerce } from "./models/commerce"
import { District } from "./models/district"
import { Field } from "./models/field"
import { FieldSet } from "./models/field-set"
import { Form } from "./models/form"
import { Option } from "./models/option"
import { Province } from "./models/province"
import { QueryableFormField } from "./models/queryable-form-field"
import { Response } from "./models/response"
import { Subform } from "./models/sub-form"
import { Validation } from "./models/validation"
import { WaterSupply } from "./models/water-supply"

export const schema = appSchema({
  version: 6,
  tables: [
    tableSchema({
      name: Form.table,
      columns: [
        { name: "name", type: "string" },
        { name: "version", type: "number" },
      ],
    }),
    tableSchema({
      name: FieldSet.table,
      columns: [
        { name: "form_id", type: "string", isIndexed: true },
        { name: "index", type: "number", isIndexed: true },
        { name: "label", type: "string" },
        { name: "description", type: "string" },
        { name: "depend_on", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: Field.table,
      columns: [
        { name: "fieldset_id", type: "string", isIndexed: true },
        { name: "label", type: "string" },
        { name: "placeholder", type: "string" },
        { name: "type", type: "string" },
        { name: "filter_id", type: "string", isOptional: true },
        { name: "depend_on", type: "string", isOptional: true },
        { name: "filter_with_dropdown", type: "string", isOptional: true },
        { name: "verify_on", type: "number", isOptional: true },
        { name: "index", type: "number", isOptional: true },
      ],
    }),
    tableSchema({
      name: Option.table,
      columns: [
        { name: "field_id", type: "string", isIndexed: true },
        { name: "code", type: "string", isIndexed: true },
        { name: "name", type: "string" },
      ],
    }),
    tableSchema({
      name: Validation.table,
      columns: [
        { name: "field_id", type: "string", isIndexed: true },
        { name: "required", type: "boolean" },
        { name: "min", type: "number", isOptional: true },
        { name: "max", type: "number", isOptional: true },
        { name: "content_type", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: Response.table,
      columns: [
        { name: "field_id", type: "string", isIndexed: true },
        { name: "quiz_id", type: "string", isIndexed: true },
        { name: "form_id", type: "string", isIndexed: true },
        { name: "response", type: "string", isOptional: true },
      ],
    }),
    tableSchema({
      name: QueryableFormField.table,
      columns: [
        { name: "field_id", type: "string", isIndexed: true },
        { name: "name", type: "string" },
        { name: "value", type: "string" },
      ],
    }),
    tableSchema({
      name: Commerce.table,
      columns: [
        { name: "beneficiary_id", type: "string", isIndexed: true },
        { name: "weight", type: "number" },
        { name: "price", type: "number" },
        { name: "query_field_id", type: "string", isIndexed: true },
      ],
    }),
    tableSchema({
      name: Beneficiary.table,
      columns: [{ name: "name", type: "string", isIndexed: true }],
    }),
    tableSchema({
      name: Province.table,
      columns: [{ name: "name", type: "string", isIndexed: true }],
    }),
    tableSchema({
      name: District.table,
      columns: [{ name: "name", type: "string", isIndexed: true }],
    }),
    tableSchema({
      name: Association.table,
      columns: [
        { name: "idRegadio", type: "string", isIndexed: true },
        { name: "designacao", type: "string", isIndexed: true },
      ],
    }),
    tableSchema({
      name: WaterSupply.table,
      columns: [
        { name: "codeRegadio", type: "string", isIndexed: true },
        { name: "localizacao", type: "string" },
        { name: "designacao", type: "string" },
      ],
    }),
    tableSchema({
      name: Subform.table,
      columns: [
        { name: "main_id", type: "string", isIndexed: true },
        { name: "main_form_field_id", type: "string", isIndexed: true },
        { name: "form_id", type: "string", isIndexed: true },
      ],
    }),
  ],
})
