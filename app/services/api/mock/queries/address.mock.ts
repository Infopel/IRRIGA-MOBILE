import { rest } from "msw"
import { DEFAULT_API_CONFIG } from "../../api-config"
import districtsJson from "./.responses/districts.json"

const url = DEFAULT_API_CONFIG.url
export default [
  rest.get<{ username: string; password: string }>(
    url + "/getDistritosBy/:provinceId",
    (req, res, ctx) => {
      const provinceId = req.params.provinceId

      for (const province of districtsJson) {
        if (province.id + "" === provinceId) {
          return res(ctx.status(200), ctx.json({ province }))
        }
      }

      return res(ctx.status(404), ctx.json("Província sem distritos disponíveis!!"))
    },
  ),
]
