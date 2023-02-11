import { rest } from "msw"
import { DEFAULT_API_CONFIG } from "../../api-config"
import { forms, GetFormBody, GetFormResponse } from "api"

const url = DEFAULT_API_CONFIG.url
export default [
  rest.get<GetFormResponse, GetFormBody>(url + "/getForm", async (req, res, ctx) => {
    const formId = req.url.searchParams.get("FormId")
    const userId = req.url.searchParams.get("IdUser")

    switch (formId) {
      case forms.agro_commerce_monitoring:
        const form1 = require("./.responses/form-agro-commerce-monitoring.json")
        return res(ctx.status(200), ctx.json(form1))
      case forms.agro_income_monitoring:
        const form2 = require("./.responses/form-agro-income-monitoring.json")
        return res(ctx.status(200), ctx.json(form2))
      case forms.beneficiary:
        const form3 = require("./.responses/form-beneficiaries.json")
        return res(ctx.status(200), ctx.json(form3))
      case forms.farm_school_monitoring:
        const form4 = require("./.responses/form-farm-school-monitoring.json")
        return res(ctx.status(200), ctx.json(form4))
      case forms.farm_school_register:
        const form5 = require("./.responses/form-farm-school-register.json")
        return res(ctx.status(200), ctx.json(form5))
      case forms.farm_tools_distribuition:
        const form6 = require("./.responses/form-farm-tools-distribuition.json")
        return res(ctx.status(200), ctx.json(form6))
      case forms.formation:
        const form7 = require("./.responses/form-formation.json")
        return res(ctx.status(200), ctx.json(form7))
      case forms.satisfaction_evaluation:
        const form8 = require("./.responses/form-satisfaction-evaluation.json")
        return res(ctx.status(200), ctx.json(form8))
      case forms.water_supply:
        const form9 = require("./.responses/form-water-supply.json")
        return res(ctx.status(200), ctx.json(form9))
      case forms.water_supply_constuction_fiscalization:
        const form10 = require("./.responses/form-water-supply-contraction-fiscalization.json")
        return res(ctx.status(200), ctx.json(form10))
      case forms.water_supply_contruction_monitoring:
        const form11 = require("./.responses/form-water-supply-monitoring.json")
        return res(ctx.status(200), ctx.json(form11))
      case forms.water_supply_intensification:
        const form12 = require("./.responses/form-water-supply-intensifiction.json")
        return res(ctx.status(200), ctx.json(form12))

      default:
        return res(ctx.status(404))
    }
  }),
]
