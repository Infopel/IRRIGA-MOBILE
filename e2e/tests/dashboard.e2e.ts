import { element, expect } from "detox"

describe.only("Dashboard", function () {
  beforeEach(async function () {
    await device.launchApp()
  })

  it("should have a dashboard screen", async function () {
    await expect(element(by.id("dashboard-screen"))).toExist()
  })
})
