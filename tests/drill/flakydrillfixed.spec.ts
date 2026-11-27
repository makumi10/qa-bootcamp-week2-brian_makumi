import { test, expect } from "@playwright/test";
import { pathToFileURL } from "url";
import * as path from "path";

const drillUrl = pathToFileURL(path.join(__dirname, "index.html")).href;

test("Save shows the message (fixed: wait for the condition)", async ({
  page,
}) => {
  await page.goto(drillUrl);

  await page.getByRole("button", { name: "Save" }).click();

  await expect(page.locator("#status")).toHaveText("Saved");
});