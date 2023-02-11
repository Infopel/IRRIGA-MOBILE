import { getSnapshot, Instance } from "mobx-state-tree"
import { Environment } from "../environment"
import { FormStoreModel, SubformModel, IFormStore } from "models"
jest.useFakeTimers("legacy")

describe("SmokeTest", () => {
  test("can be created", () => {
    const instance = FormStoreModel.create({
      currentPage: 0,
      error: "error",
      form: undefined,
      isFormSubmitted: false,
      isRequestingForm: false,
    })

    expect(instance).toBeTruthy()
  })
})

describe("Request Form", () => {
  test("should find beneficiary from", async () => {
    const env = new Environment()
    await env.setup()
    const instance = FormStoreModel.create(
      {
        currentPage: 0,
        error: "error",
        form: undefined,
        isFormSubmitted: false,
        isRequestingForm: false,
      },
      env,
    )
    await instance._requestForm("beneficiary").then(() => {
      expect(instance.error).toBeFalsy()
      expect(instance.form).toBeTruthy()
    })
  })
  test("should find water supply from", async () => {
    const env = new Environment()
    await env.setup()
    const instance = FormStoreModel.create(
      {
        currentPage: 0,
        error: "error",
        form: undefined,
        isFormSubmitted: false,
        isRequestingForm: false,
      },
      env,
    )
    await instance._requestForm("water_supply").then(() => {
      expect(instance.error).toBeFalsy()
      expect(instance.form).toBeTruthy()
    })
  })

  test("should show error if form is not found", async () => {
    const env = new Environment()
    await env.setup()

    const instance = FormStoreModel.create(
      {
        currentPage: 0,
        error: "error",
        form: undefined,
        isFormSubmitted: false,
        isRequestingForm: false,
      },
      env,
    )

    //@ts-ignore
    await instance._requestForm("non-existent-form").then(() => {
      expect(instance.form).toBeFalsy()
      expect(instance.error).toBeTruthy()
    })
  })
})

describe("Form Operations", () => {
  it("should update text field", () => {
    const instance = FormStoreModel.create({
      currentPage: 0,
      error: undefined,
      form: {
        id: "abf1cb25-5ed6-47c2-9219-d414c373663b",
        name: "Formulário de Beneficiário",
        fieldset: [
          {
            id: 1,
            label: "Dados Básicos",
            description: "Dados Básicos",
            controls: [
              {
                id: 1,
                label: "Nome",
                dependOn: null,
                verifyOn: 0,
                type: "text",
                labelField: 0,
                filterWithDropdown: null,
                placeholder: "Nome",
                value: null,
                options: [],
                validators: {
                  required: true,
                  min: 0,
                  max: 0,
                  contentType: null,
                },
              },
            ],
          },
        ],
      },
      isFormSubmitted: false,
      isRequestingForm: false,
    })

    instance.updateField("1", "Antonio")
    expect(instance.getFieldOutput("1")?.value).toBe("Antonio")
  })

  it("should update multivalue field", () => {
    const instance = FormStoreModel.create({
      currentPage: 0,
      error: undefined,
      form: {
        id: "abf1cb25-5ed6-47c2-9219-d414c373663b",
        name: "Formulário de Beneficiário",
        fieldset: [
          {
            id: 1,
            label: "Dados Básicos",
            description: "Dados Básicos",
            controls: [
              {
                id: 1,
                label: "Distrito",
                dependOn: null,
                verifyOn: 0,
                type: "chip",
                labelField: 0,
                filterWithDropdown: null,
                placeholder: "Nome",
                value: null,
                options: [
                  { id: 1, name: "Kamavota" },
                  { id: 2, name: "Kamabukwane" },
                  { id: 1, name: "Marraquene" },
                ],
                validators: {
                  required: true,
                  min: 0,
                  max: 0,
                  contentType: null,
                },
              },
            ],
          },
        ],
      },
      isFormSubmitted: false,
      isRequestingForm: false,
    })

    instance.updateField("1", ["1", "2"])
    expect(instance.getFieldOutput("1")?.multiValue).toEqual(["1", "2"])
  })
})

describe("Subform ", () => {
  test("should find a subform", async () => {
    const mainForm = {
      id: "abf1cb25-5ed6-47c2-9219-d414c373663b",
      name: "Formulário de Beneficiário",
      fieldset: [
        {
          id: 1,
          label: "Dados Básicos",
          description: "Dados Básicos",
          controls: [
            {
              id: "1",
              label: "Subform",
              dependOn: null,
              verifyOn: 0,
              type: "form",
              labelField: 2,
              filterWithDropdown: null,
              placeholder: "Subform",
              value: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
              options: [],
              validators: {
                required: true,
                min: 0,
                max: 0,
                contentType: null,
              },
            },
          ],
        },
      ],
    }

    const secondForm = {
      id: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
      name: "Formulário de Culturas or something",
      fieldset: [
        {
          id: 1,
          label: "Dados Básicos",
          description: "Dados Básicos",
          controls: [
            {
              id: "2",
              label: "Subform",
              dependOn: null,
              isDisabled: false,
              error: undefined,
              isLoadingRequest: false,
              type: "text",
              labelField: 0,
              filterWithDropdown: null,
              placeholder: "text",
              value: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
              options: [],
              validators: {
                required: true,
              },
            },
          ],
        },
      ],
    }
    const instance = FormStoreModel.create({
      currentPage: 0,
      error: undefined,
      form: mainForm,
      secundaryForm: [secondForm],
      isFormSubmitted: false,
      isRequestingForm: false,
    })
    expect(instance.getAllFieldsFromForm("1")).toEqual({
      fields: secondForm.fieldset[0].controls,
      formId: secondForm.id,
      labelField: 2,
    })
  })

  test("should save subform", async () => {
    const SUBFORM = {
      233: [
        {
          id: "1",
          name: "Repolho",
        },
        {
          id: "2",
          name: "Cebola",
        },
        {
          id: "3",
          name: "Tomate",
        },
      ],
      234: "Salada",
      235: {
        id: "1",
        name: "Hortícolas",
      },
      236: "500",
      237: "800",
    }

    const env = new Environment()
    await env.setup()

    const instance = FormStoreModel.create(
      {
        currentPage: 0,
        error: "error",
        form: undefined,
        isFormSubmitted: false,
        isRequestingForm: false,
      },
      env,
    )

    await instance._requestForm("beneficiary")

    instance.updateField(
      "233",
      SUBFORM["233"].map(({ id }) => id + ""),
    )
    instance.updateField("234", SUBFORM[234])
    instance.updateField("235", SUBFORM[235].id + "")
    instance.updateField("236", SUBFORM[236])
    instance.updateField("237", SUBFORM[237])

    const secundaryForm = instance.secundaryForm[0]

    instance.saveSubform(secundaryForm.id, 233)

    const filledForm: Instance<typeof SubformModel> = instance.subformsOutput.values().next()
      .value as any

    expect(getSnapshot(filledForm.output)).toEqual([
      {
        input: "233",
        value: undefined,
        multiValue: SUBFORM["233"].map(({ id }) => id + ""),
        form: secundaryForm.id,
      },
      { input: "234", value: SUBFORM[234], multiValue: [], form: secundaryForm.id },
      { input: "235", value: SUBFORM[235].id, multiValue: [], form: secundaryForm.id },
      { input: "236", value: SUBFORM[236], multiValue: [], form: secundaryForm.id },
      { input: "237", value: SUBFORM[237], multiValue: [], form: secundaryForm.id },
    ])
  })
  test("should show subform output text value", async () => {
    const SUBFORM = {
      233: [
        {
          id: "1",
          name: "Repolho",
        },
        {
          id: "2",
          name: "Cebola",
        },
        {
          id: "3",
          name: "Tomate",
        },
      ],
      234: "Salada",
      235: {
        id: "1",
        name: "Hortícolas",
      },
      236: "500",
      237: "800",
    }

    const env = new Environment()
    await env.setup()

    const instance = FormStoreModel.create(
      {
        currentPage: 0,
        error: "error",
        form: undefined,
        isFormSubmitted: false,
        isRequestingForm: false,
      },
      env,
    )

    await instance._requestForm("beneficiary")
    instance.updateField(
      "233",
      SUBFORM["233"].map(({ id }) => id + ""),
    )
    instance.updateField("234", SUBFORM[234])
    instance.updateField("235", SUBFORM[235].id + "")
    instance.updateField("236", SUBFORM[236])
    instance.updateField("237", SUBFORM[237])

    const secundaryForm = instance.secundaryForm[0]
    instance.getAllFieldsFromForm("22")
    instance.saveSubform(secundaryForm.id, 233)

    expect(instance.getSubformOutput(secundaryForm.id).map(({ name }) => name)).toEqual([
      SUBFORM[233].reduce(
        (acc, value) => (acc ? acc + ", " + value.name : value.name),
        undefined as string | undefined,
      ),
    ])
  })

  test("should show selected form output", () => {
    const instance = FormStoreModel.create({
      currentPage: 0,
      error: undefined,
      form: {
        id: "abf1cb25-5ed6-47c2-9219-d414c373663b",
        name: "Formulário de Beneficiário",
        fieldset: [
          {
            id: 1,
            label: "Dados Básicos",
            description: "Dados Básicos",
            controls: [
              {
                id: 1,
                label: "Subform",
                dependOn: null,
                verifyOn: 0,
                type: "form",
                labelField: 2,
                filterWithDropdown: null,
                placeholder: "Subform",
                value: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
                options: [],
                validators: {
                  required: true,
                  min: 0,
                  max: 0,
                  contentType: null,
                },
              },
            ],
          },
        ],
      },
      secundaryForm: [
        {
          id: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
          name: "Formulário de Culturas or something",
          fieldset: [
            {
              id: 2,
              label: "Dados Básicos",
              description: "Dados Básicos",
              controls: [
                {
                  id: 2,
                  label: "Subform",
                  dependOn: null,
                  verifyOn: 0,
                  type: "text",
                  labelField: 0,
                  filterWithDropdown: null,
                  placeholder: "text",
                  options: [],
                  validators: {
                    required: true,
                    min: 0,
                    max: 0,
                    contentType: null,
                  },
                },
              ],
            },
          ],
        },
      ],
      subformsOutput: {
        d414c373663b: {
          id: "d414c373663b",
          labelField: 2,
          output: [
            {
              form: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
              input: 2,
              value: "Bom dia",
            },
          ],
        },
      },
      isFormSubmitted: false,
      isRequestingForm: false,
    })

    instance.setSubformOutput("d414c373663b")

    expect(instance.getSubformOutput("abf1cb25-5ed6-47c2-9219-d414c373663bsad")).toEqual([
      { id: "d414c373663b", name: "Bom dia" },
    ])
  })
  test("should set populate forms output with selected subform", () => {
    const instance = FormStoreModel.create({
      currentPage: 0,
      error: undefined,
      form: {
        id: "abf1cb25-5ed6-47c2-9219-d414c373663b",
        name: "Formulário de Beneficiário",
        fieldset: [
          {
            id: 1,
            label: "Dados Básicos",
            description: "Dados Básicos",
            controls: [
              {
                id: 1,
                label: "Subform",
                dependOn: null,
                verifyOn: 0,
                type: "form",
                labelField: 2,
                filterWithDropdown: null,
                placeholder: "Subform",
                value: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
                options: [],
                validators: {
                  required: true,
                  min: 0,
                  max: 0,
                  contentType: null,
                },
              },
            ],
          },
        ],
      },
      secundaryForm: [
        {
          id: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
          name: "Formulário de Culturas or something",
          fieldset: [
            {
              id: 2,
              label: "Dados Básicos",
              description: "Dados Básicos",
              controls: [
                {
                  id: 2,
                  label: "Periodo do dia",
                  dependOn: null,
                  verifyOn: 0,
                  type: "text",
                  labelField: 0,
                  filterWithDropdown: null,
                  placeholder: "text",
                  options: [],
                  validators: {
                    required: true,
                    min: 0,
                    max: 0,
                    contentType: null,
                  },
                },
              ],
            },
          ],
        },
      ],
      subformsOutput: {
        d414c373663b: {
          id: "d414c373663b",
          labelField: 2,
          output: [
            {
              form: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
              input: 2,
              value: "Bom dia",
            },
          ],
        },
        rtyuiop: {
          id: "rtyuiop",
          labelField: 2,
          output: [
            {
              form: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
              input: 2,
              value: "Boa noite",
            },
          ],
        },
      },
      isFormSubmitted: false,
      isRequestingForm: false,
    })

    instance.setSubformOutput("d414c373663b")
    expect(instance.getFieldOutput("2")?.value).toBe("Bom dia")

    instance.setSubformOutput("rtyuiop")
    expect(instance.getFieldOutput("2")?.value).toBe("Boa noite")
  })
  test("should delete subforms output", () => {
    const instance = FormStoreModel.create({
      currentPage: 0,
      error: undefined,
      form: {
        id: "abf1cb25-5ed6-47c2-9219-d414c373663b",
        name: "Formulário de Beneficiário",
        fieldset: [
          {
            id: 1,
            label: "Dados Básicos",
            description: "Dados Básicos",
            controls: [
              {
                id: 1,
                label: "Subform",
                dependOn: null,
                verifyOn: 0,
                type: "form",
                labelField: 2,
                filterWithDropdown: null,
                placeholder: "Subform",
                value: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
                options: [],
                validators: {
                  required: true,
                  min: 0,
                  max: 0,
                  contentType: null,
                },
              },
            ],
          },
        ],
      },
      secundaryForm: [
        {
          id: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
          name: "Formulário de Culturas or something",
          fieldset: [
            {
              id: 2,
              label: "Dados Básicos",
              description: "Dados Básicos",
              controls: [
                {
                  id: 2,
                  label: "Periodo do dia",
                  dependOn: null,
                  verifyOn: 0,
                  type: "text",
                  labelField: 0,
                  filterWithDropdown: null,
                  placeholder: "text",
                  options: [],
                  validators: {
                    required: true,
                    min: 0,
                    max: 0,
                    contentType: null,
                  },
                },
              ],
            },
          ],
        },
      ],
      subformsOutput: {
        rtyuiop: {
          id: "rtyuiop",
          labelField: 2,
          output: [
            {
              form: "abf1cb25-5ed6-47c2-9219-d414c373663bsad",
              input: 2,
              value: "Boa noite",
            },
          ],
        },
      },
      isFormSubmitted: false,
      isRequestingForm: false,
    })
    instance.setSubformOutput("rtyuiop")
    instance.deleteSubformOutput("rtyuiop")
    expect(instance.subformsOutput.get("rtyuiop")).toBeFalsy()
    expect(instance.getFieldOutput("2")?.value).toBeFalsy()
  })
})
