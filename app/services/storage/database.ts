import { Database } from "@nozbe/watermelondb"
import { Field } from "./models/field"
import { FieldSet } from "./models/field-set"
import { Form } from "./models/form"
import { Option } from "./models/option"
import { Response } from "./models/response"
import { Validation } from "./models/validation"

import adapter from "./adapter"
import { Association } from "./models/association"
import { Commerce } from "./models/commerce"
import { District } from "./models/district"
import { Province } from "./models/province"
import { QueryableFormField } from "./models/queryable-form-field"
import { WaterSupply } from "./models/water-supply"
import { Subform } from "./models/sub-form"
// Then, make a Watermelon database from it!
export const database = new Database({
  adapter,
  modelClasses: [
    Field,
    FieldSet,
    Form,
    Option,
    Response,
    Validation,
    Commerce,
    QueryableFormField,
    Association,
    WaterSupply,
    Subform,
    Province,
    District,
    Association,
    WaterSupply,
  ],
})

export const resetDatabase = async () =>
  await database.write(async () => await database.unsafeResetDatabase())

/// ReactNativeFlipperDatabases - START

if (__DEV__) {
  // Import connectDatabases function and required DBDrivers
  const { connectDatabases, WatermelonDB } = require("react-native-flipper-databases")

  connectDatabases([
    new WatermelonDB(database), // Pass in database definition
  ])
}

/// ReactNativeFlipperDatabases - END
