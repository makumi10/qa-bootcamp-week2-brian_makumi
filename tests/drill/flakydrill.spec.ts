import { test, expect } from "@playwright/test";
import { pathToFileURL } from "url";
import * as path from "path";

const drillUrl = pathToFileURL(path.join(__dirname, "index.html")).href;

test("Save shows the message (unfixed: fixed wait)", async ({ page }) => {
  await page.goto(drillUrl);

  await page.getByRole("button", { name: "Save" }).click();

  await page.waitForTimeout(500);
  const message = await page.locator("#status").textContent();

  expect(message).toBe("Saved");
});