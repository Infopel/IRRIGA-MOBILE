import { Q } from "@nozbe/watermelondb"
import { database } from "../database"
import { Form } from "./form"
import { addOrUpdateForm } from "../mutations"
import { Response } from "./response"

describe("Form", () => {
  beforeAll(async () => {
    await addOrUpdateForm(database, [
      {
        id: "1",
        name: "Simple Form",
        fieldset: [
          {
            id: 1,
            description: "First page description",
            label: "First Page",
            controls: [
              {
                id: "1",
                label: "First Name",
                type: "text",
                placeholder: "First Name",
              },
            ],
          },
        ],
      },
    ])
  })
  it("should find form by id", async () => {
    const form = await database.collections.get<Form>(Form.table).find("1")
    expect(form).toBeDefined()
    expect(form?.name).toBe("Simple Form")
  })
  it("should add response to database", async () => {
    const form = await database.collections.get<Form>(Form.table).find("1")
    const quizId = "test"
    await form.saveForm(
      [
        { fieldId: "1", response: "Bom dia" },
        { fieldId: "2", response: "Bom dia" },
        { fieldId: "3", response: "Bom dia" },
      ],
      quizId,
    )

    const responses = await database.collections
      .get<Response>(Response.table)
      .query(Q.where("quiz_id", Q.eq(quizId)))
      .fetch()

    expect(responses.length).toBe(3)
  })
})
