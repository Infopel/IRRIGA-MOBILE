import { addColumns, schemaMigrations, createTable } from "@nozbe/watermelondb/Schema/migrations"
import { FieldSet } from "./models/field-set"
import { Field } from "./models/field"
import { Subform } from "./models/sub-form"

export default schemaMigrations({
  migrations: [
    {
      toVersion: 3,
      steps: [
        addColumns({
          table: Field.table,
          columns: [
            { name: "filter_id", type: "string", isOptional: true },
            { name: "depend_on", type: "string", isOptional: true },
            { name: "filter_with_dropdown", type: "string", isOptional: true },
            { name: "verify_on", type: "number", isOptional: true },
          ],
        }),
        addColumns({
          table: FieldSet.table,
          columns: [{ name: "depend_on", type: "string", isOptional: true }],
        }),
      ],
    },
    {
      toVersion: 4,
      steps: [
        addColumns({
          table: Field.table,
          columns: [{ name: "index", type: "number", isOptional: true }],
        }),
      ],
    },
    {
      toVersion: 5,
      steps: [
        createTable({
          name: Subform.table,
          columns: [
            { name: "main_id", type: "string", isIndexed: true },
            { name: "form_id", type: "string", isIndexed: true },
          ],
        }),
      ],
    },
    {
      toVersion: 6,
      steps: [
        addColumns({
          table: Subform.table,
          columns: [{ name: "main_form_field_id", type: "string", isIndexed: true }],
        }),
      ],
    },
  ],
})
