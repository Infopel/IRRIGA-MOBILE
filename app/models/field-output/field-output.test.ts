import { getSnapshot } from "mobx-state-tree"
import { FormStoreModel } from "models/form-store/form-store"
import { FormModel } from "models/form/form"
import { FieldOutputModel } from "./field-output"

test("should be created", () => {
  const FIELD_ID = "uhhb200"
  const FORM_ID = "250"

  const form = FormModel.create({
    id: FORM_ID,
    name: "sadasd",
    fieldset: [
      {
        description: "asdsa",
        id: 45,
        label: "asdasd",
        controls: [
          {
            id: FIELD_ID,
            label: "asdsad",
            type: "text",
          },
        ],
      },
    ],
  })

  const instance = FieldOutputModel.create({
    form: FORM_ID,
    input: FIELD_ID,
  })
  const formStore = FormStoreModel.create({
    form: form,
    currentPage: 0,
    output: [getSnapshot(instance)],
  })

  expect(instance).toBeTruthy()
})

describe("Text", () => {
  test("should update a text input", () => {
    const INPUT = "bom dia"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    formStore.updateField(FIELD_ID, INPUT)

    expect(formStore.getFieldOutput(FIELD_ID)?.value).toBe(INPUT)
  })

  test("should throw an error if update field takes a list", () => {
    const INPUT = ["bom", " ", "dia"]
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    expect(() => formStore.updateField(FIELD_ID, INPUT)).toThrowError(
      `Invalid ${INPUT} for text control`,
    )
  })
})
describe("Date ", () => {
  test("should update a date input", () => {
    const INPUT = "1670882400000"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "date",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    formStore.updateField(FIELD_ID, INPUT)

    expect(formStore.getFieldOutput(FIELD_ID)?.value).toBe(INPUT)
  })
  test("should throw error if input is not date-number", () => {
    const INPUT = ["erghfjh", "sss"]
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "date",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    expect(() => formStore.updateField(FIELD_ID, INPUT)).toThrowError(
      `Invalid ${INPUT} for date control`,
    )
  })
})

describe("Chip", () => {
  test("should update a chip input", () => {
    const INPUT = ["1", "2"]
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "Female Names",
              type: "chip",
              options: [
                { id: 1, name: "Sonia" },
                { id: 2, name: "Tanya" },
              ],
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    formStore.updateField(FIELD_ID, INPUT)

    expect(formStore.getFieldOutput(FIELD_ID)?.value).toBeFalsy()
    expect(formStore.getFieldOutput(FIELD_ID)?.multiValue).toEqual(INPUT)
  })
  test("should throw error if options does not exist", () => {
    const INPUT = "bom dia"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "chip",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    expect(() => formStore.updateField(FIELD_ID, INPUT)).toThrowError()
  })
  test("should throw error if input i not a list", () => {
    const INPUT = "bom dia"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "chip",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    expect(() => formStore.updateField(FIELD_ID, INPUT)).toThrowError(
      `Invalid ${INPUT} for chip control`,
    )
  })
})
describe("Radio", () => {
  test("should update a radio input", () => {
    const INPUT = "20"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "radio",
              options: [
                {
                  id: "20",
                  name: "Bond",
                },
              ],
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    formStore.updateField(FIELD_ID, INPUT)

    expect(formStore.getFieldOutput(FIELD_ID)?.value).toBe(INPUT)
  })
  test("should throw an error is input is not on options list", () => {
    const INPUT = "2"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "radio",
              options: [
                {
                  id: "1",
                  name: "super",
                },
              ],
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    expect(() => formStore.updateField(FIELD_ID, INPUT)).toThrowError(
      `Value with id ${INPUT} does not exist on Options list`,
    )
  })
})

describe("DropDown", () => {
  test("should update a dropdown input", () => {
    const INPUT = "2"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              options: [
                {
                  id: "1",
                  name: "ertyu",
                },
                { id: "2", name: "gdsakjd" },
              ],
              id: FIELD_ID,
              label: "asdsad",
              type: "dropdown",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    formStore.updateField(FIELD_ID, INPUT)
    const field = formStore.getFieldOutput(FIELD_ID)
    expect(field?.multiValue).toEqual([])
    expect(field?.value).toEqual(INPUT)
  })
  test("should throw error options that does not exist", () => {
    const INPUT = "2"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "dropdown",
              options: [{ id: "1", name: "Bom dia" }],
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    expect(() => formStore.updateField(FIELD_ID, INPUT)).toThrowError(
      `Value with id ${INPUT} does not exist on Options list`,
    )
  })
  test("should throw error options is empty", () => {
    const INPUT = "2"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "dropdown",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    expect(() => formStore.updateField(FIELD_ID, INPUT)).toThrowError(
      `Field options list must not be empty`,
    )
  })
})
describe("Location", () => {
  test("should update a location input", () => {
    const INPUT = ["23.4842114", "-32.7466264"]
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              options: [
                {
                  id: "1",
                  name: "ertyu",
                },
                { id: "2", name: "gdsakjd" },
              ],
              id: FIELD_ID,
              label: "asdsad",
              type: "location",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    formStore.updateField(FIELD_ID, INPUT)
    const field = formStore.getFieldOutput(FIELD_ID)
    expect(field?.value).toBeFalsy()
    expect(field?.multiValue).toEqual(INPUT)
  })
  test("should throw input is not a list of 2 items", () => {
    const INPUT = ["1"]
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "location",
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    expect(() => formStore.updateField(FIELD_ID, INPUT)).toThrowError(
      `Invalid ${INPUT} for location control`,
    )
  })
})
describe("Capture", () => {
  test("should update a capture with", () => {
    const INPUT = ["file://storage/input/rtyuw.jpg", "file://storage/input/rtyu.jpg"]
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"
    const MIN = 1
    const MAX = 1

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "capture",
              validators: {
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    formStore.updateField(FIELD_ID, INPUT)
    const field = formStore.getFieldOutput(FIELD_ID)
    expect(field?.value).toBeFalsy()
    expect(field?.multiValue).toEqual(INPUT)
  })
  test("should throw an error if input is not a list", () => {
    const INPUT = "file://storage/input/rtyu.jpg"
    const FIELD_ID = "uhhb200"
    const FORM_ID = "250"
    const MIN = 1
    const MAX = 1

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "capture",
              validators: {
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })

    expect(() => formStore.updateField(FIELD_ID, INPUT)).toThrowError(
      `Invalid ${INPUT} for capture control`,
    )
  })
})

describe("Text Validations", () => {
  it("should set error if text is less than 5 chars", () => {
    const INPUT = "supe"
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = 5
    const MAX = undefined

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
              validators: {
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
  })
  it("should set error if text is more than 5 chars", () => {
    const INPUT = "supe75"
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = undefined
    const MAX = 5

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
              validators: {
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
  })
  it("should set error if number is bigger 500", () => {
    const INPUT = "501"
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = undefined
    const MAX = 500

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
              validators: {
                contentType: "number",
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
  })
  it("should set error if number is lesser 100", () => {
    const INPUT = "99"
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = 100
    const MAX = undefined

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
              validators: {
                contentType: "number",
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
  })
  it("should set error if money is negative", () => {
    const INPUT = "-99"
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = undefined
    const MAX = undefined

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
              validators: {
                contentType: "money",
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
  })
  it("should set error if phone number is invalid", () => {
    const INPUT = "8123456"
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = undefined
    const MAX = undefined

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
              validators: {
                contentType: "tel",
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
  })

  it("should set invalid field as valid after add valid input", () => {
    const INVALID_INPUT = "8123456"
    const VALID_INPUT = "841234567"
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = undefined
    const MAX = undefined

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
              validators: {
                contentType: "tel",
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INVALID_INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
    formStore.updateField(FIELD_ID, VALID_INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeUndefined()
  })
  it("should set valid field if it is empty after being set as error", () => {
    const FIRST_INPUT = "325"
    const SECOND_INPUT = ""
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = undefined
    const MAX = undefined

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "text",
              validators: {
                contentType: "tel",
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, FIRST_INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
    formStore.updateField(FIELD_ID, SECOND_INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeUndefined()
  })
})

describe("Capture Validations", () => {
  it("should set image error if images is less than 5", () => {
    const INPUT = ["item", "item"]
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = 5
    const MAX = undefined

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "capture",
              validators: {
                contentType: "tel",
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
  })
})
describe("Date Validations", () => {
  it("should set error if date number inValid", () => {
    const INPUT = "null"
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = 5
    const MAX = undefined

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "date",
              validators: {
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeTruthy()
  })
  it("should set isValid if date number valid", () => {
    const INPUT = '1660212169214'
    const FORM_ID = "250"
    const FIELD_ID = "uhhb200"
    const MIN = 5
    const MAX = undefined

    const form = FormModel.create({
      id: FORM_ID,
      name: "sadasd",
      fieldset: [
        {
          description: "asdsa",
          id: 45,
          label: "asdasd",
          controls: [
            {
              id: FIELD_ID,
              label: "asdsad",
              type: "date",
              validators: {
                max: MAX,
                min: MIN,
                required: false,
              },
            },
          ],
        },
      ],
    })

    const instance = FieldOutputModel.create({
      form: FORM_ID,
      input: FIELD_ID,
    })
    const formStore = FormStoreModel.create({
      form: form,
      currentPage: 0,
      output: [getSnapshot(instance)],
    })
    formStore.updateField(FIELD_ID, INPUT)
    expect(formStore.getFieldOutput(FIELD_ID)?.error).toBeUndefined()
  })
})
