import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchBox = page.getByRole("textbox", { name: "Search" });
    this.searchButton = page.getByRole("button", { name: "Search" });
    this.productNames = page.getByRole("heading", { level: 5 });
  }

  async goto() {
    await this.page.goto("https://practicesoftwaretesting.com");
  }

  async searchFor(term: string) {
    await this.searchBox.fill(term);
    await this.searchButton.click();
  }

  searchCaption(term: string) {
    return this.page.getByText(`Searched for: ${term}`);
  }

  productNamesNotContaining(term: string) {
    return this.productNames.filter({ hasNotText: new RegExp(term, "i") });
  }
}