import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/homepage";

test("C1 Search by name", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.searchFor("pliers");

  await expect(homePage.searchCaption("pliers")).toBeVisible();

  await expect(homePage.productNames.first()).toContainText(/pliers/i);

  await expect(homePage.productNamesNotContaining("pliers")).toHaveCount(0);
});