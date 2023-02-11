import { rest } from "msw"
import { DEFAULT_API_CONFIG } from "../../api-config"
import loginJson from "./.responses/login.json"

const url = DEFAULT_API_CONFIG.url
export default [
  rest.post<{ username: string; password: string }>(url + "/login", (req, res, ctx) => {
    const defPass = "irriga@2022"
    const defUsers = ["ben@irriga.com", "reg@irriga.com"]
    // Storage.setItem("is-authenticated", "true")
    const { password, username } = req.body
    if (password.trim() !== defPass || !defUsers.includes(username.trim().toLocaleLowerCase())) {
      return res(ctx.status(404), ctx.delay(2000),ctx.json({ user: "Invalid Credentials" }))
    }
    if (username.toLocaleLowerCase().trim() === defUsers[0]) {
      loginJson.user[0].username = username
      loginJson.user[0].role = "beneficiary"
      return res(ctx.status(200), ctx.delay(2000), ctx.json(loginJson))
    } else if (username.toLocaleLowerCase().trim() === defUsers[1]) {
      loginJson.user[0].username = username
      loginJson.user[0].role = "regadio"
      return res(ctx.status(200),ctx.delay(2000), ctx.json(loginJson))
    }
    return res(ctx.status(404), ctx.json({ user: "user not found" }))
  }),
]
