import { test, expect } from "@playwright/test";

test("searching for pliers returns only products with pliers in the name", async ({
  page,
}) => {
  await page.goto("https://practicesoftwaretesting.com");

  await page.getByRole("textbox", { name: "Search" }).fill("pliers");
  await page.getByRole("button", { name: "Search" }).click();

  await expect(page.getByText("Searched for: pliers")).toBeVisible();

  const productNames = page.getByRole("heading", { level: 5 });

  await expect(productNames.first()).toContainText(/pliers/i);

  await expect(productNames.filter({ hasNotText: /pliers/i })).toHaveCount(0);
});