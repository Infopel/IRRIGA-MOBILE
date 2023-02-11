import { forms } from "api/form-api"
import { database } from "storage/database"
import { Field, FieldSet, Form, Option, Response } from "storage/models"
import { addOrUpdateForm } from "storage/mutations/form"
import { beneficiariesFields as fields } from "../constants"
import { IBeneficiary } from "../types"

const formId = "simple-form"
const fieldSetId = "simple-form"
const quizId = "simple-quiz"
const firstNameField = fields.FIRST_NAME
const lastNameField = fields.LAST_NAME
const provinceField = fields.PROVINCE
const districtField = fields.DISTRICT
const adminPostField = fields.ADMIN_POST
const localityField = fields.LOCALITY
const waterSupplyField = fields.WATER_SUPPLY
const associationField = fields.ASSOCIATION
const provinceOption = "province-option"
const provinceOptionRes = "Maputo"
const districtOption = "district-option"
const districtOptionRes = "KaMavota"
const associationOption = "association-option"
const associationOptionRes = "Associacao Matola"
const waterSupplyOption = "water-supply-option"
const waterSupplyOptionRes = "Regadio de Maputo"
const adminPostRes = "Posto de Beluane"
const localityRes = "Localidate de Matota"
const firstNameRes = "Marco"
const lastNameRes = "Polo"

export function getBeneficiaryDetailsResponse(): IBeneficiary {
  return {
    id: quizId,
    address: `${provinceOptionRes}, ${districtOptionRes}, ${adminPostRes}, ${localityRes}`,
    association: associationOptionRes,
    waterSupply: waterSupplyOptionRes,
    name: `${firstNameRes} ${lastNameRes}`,
  }
}

export async function populateSimpleForm() {
  await addOrUpdateForm(database, [
    {
      id: forms.beneficiary,
      name: "Simple Form",
      fieldset: [
        {
          id: 1,
          label: "First Page",
          description: "First page description",
          controls: [
            {
              id: "1",
              label: "First Name",
              type: "text",
              placeholder: "First Name",
              options: [],
            },
          ],
        },
      ],
    },
  ])
  return await database.collections.get<Form>(Form.table).find(forms.beneficiary)
}

export async function populateBeneficiaryDetails() {
  const formCollection = database.get<Form>(Form.table)
  const fieldsetCollection = database.get<FieldSet>(FieldSet.table)
  const fieldCollection = database.get<Field>(Field.table)
  const optionCollection = database.get<Option>(Option.table)
  const responseCollection = database.get<Response>(Response.table)

  const createForm = formCollection.prepareCreate((rec) => {
    rec._raw.id = formId
    rec.name = "Simple Form"
    rec.version = 1
  })

  const createFieldSet = fieldsetCollection.prepareCreate((rec) => {
    rec._raw.id = fieldSetId
    rec.index = 0
    rec.label = "A Very simple fieldset"
    rec.description = "A Very simple fieldset"
    rec._raw.form_id = formId
  })

  const createField = [
    fieldCollection.prepareCreate((rec) => {
      rec._raw.id = firstNameField
      rec.label = "firstName"
      rec.type = "text"
    }),
    fieldCollection.prepareCreate((rec) => {
      rec._raw.id = lastNameField
      rec.label = "lastName"
      rec.type = "text"
    }),
    fieldCollection.prepareCreate((rec) => {
      rec._raw.id = provinceField
      rec.label = "province"
      rec.type = "dropdown"
    }),
    fieldCollection.prepareCreate((rec) => {
      rec._raw.id = districtField
      rec.label = "district"
      rec.type = "dropdown"
    }),
    fieldCollection.prepareCreate((rec) => {
      rec._raw.id = adminPostField
      rec.label = "adminPost"
      rec.type = "dropdown"
    }),
    fieldCollection.prepareCreate((rec) => {
      rec._raw.id = localityField
      rec.label = "locality"
      rec.type = "dropdown"
    }),
    fieldCollection.prepareCreate((rec) => {
      rec._raw.id = waterSupplyField
      rec.label = "waterSupply"
      rec.type = "dropdown"
    }),
    fieldCollection.prepareCreate((rec) => {
      rec._raw.id = associationField
      rec.label = "association"
      rec.type = "dropdown"
    }),
  ]

  const createOption = [
    optionCollection.prepareCreate((rec) => {
      rec._raw.code = provinceOption
      rec._raw.field_id = provinceField
      rec.name = provinceOptionRes
    }),
    optionCollection.prepareCreate((rec) => {
      rec._raw.code = districtOption
      rec._raw.field_id = districtField
      rec.name = districtOptionRes
    }),
    optionCollection.prepareCreate((rec) => {
      rec._raw.code = associationOption
      rec._raw.field_id = associationField
      rec.name = associationOptionRes
    }),
    optionCollection.prepareCreate((rec) => {
      rec._raw.code = waterSupplyOption
      rec._raw.field_id = waterSupplyField
      rec.name = waterSupplyOptionRes
    }),
  ]

  const createResponse = [
    responseCollection.prepareCreate((rec) => {
      rec._raw.field_id = provinceField
      rec._raw.form_id = formId
      rec._raw.quiz_id = quizId
      rec.response = provinceOption
    }),
    responseCollection.prepareCreate((rec) => {
      rec._raw.field_id = districtField
      rec._raw.form_id = formId
      rec._raw.quiz_id = quizId
      rec.response = districtOption
    }),
    responseCollection.prepareCreate((rec) => {
      rec._raw.field_id = associationField
      rec._raw.form_id = formId
      rec._raw.quiz_id = quizId
      rec.response = associationOption
    }),
    responseCollection.prepareCreate((rec) => {
      rec._raw.field_id = waterSupplyField
      rec._raw.form_id = formId
      rec._raw.quiz_id = quizId
      rec.response = waterSupplyOption
    }),
    responseCollection.prepareCreate((rec) => {
      rec._raw.field_id = adminPostField
      rec._raw.form_id = formId
      rec._raw.quiz_id = quizId
      rec.response = adminPostRes
    }),
    responseCollection.prepareCreate((rec) => {
      rec._raw.field_id = localityField
      rec._raw.form_id = formId
      rec._raw.quiz_id = quizId
      rec.response = localityRes
    }),
    responseCollection.prepareCreate((rec) => {
      rec._raw.field_id = firstNameField
      rec._raw.form_id = formId
      rec._raw.quiz_id = quizId
      rec.response = firstNameRes
    }),
    responseCollection.prepareCreate((rec) => {
      rec._raw.field_id = lastNameField
      rec._raw.form_id = formId
      rec._raw.quiz_id = quizId
      rec.response = lastNameRes
    }),
  ]
  await database.write(async () => {
    await database.batch(
      createForm,
      createFieldSet,
      ...createField,
      ...createOption,
      ...createResponse,
    )
  })
}
