import { element, expect } from "detox"
describe.only("Dashboard", function () {
    beforeEach(async function () {
      await device.launchApp()
    })
  
    it("should have a insumos screen", async function () {
        await element(by.id("username")).typeText("paulo@mail.com")
    await element(by.id("password")).typeText("Qwerty123456")
    await element(by.id("login")).tap()
    await expect(element(by.id("dashboard-screen"))).toExist()
    await expect(element(by.id("login-screen"))).not.toExist()
      await expect(element(by.id("insumos-screen"))).toExist()
    })
  })
  