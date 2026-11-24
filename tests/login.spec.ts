import { test, expect } from "@playwright/test";

test("invalid login shows an error message", async ({ page }) => {
  await page.goto("https://practicesoftwaretesting.com/auth/login");

  await page
    .getByRole("textbox", { name: "Email address" })
    .fill("user@email.com");
  await page.getByPlaceholder("Your password").fill("pass123");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByText("Invalid email or password")).toBeVisible();
});