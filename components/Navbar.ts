import { Locator, Page } from '@playwright/test';

export class Navbar {
  readonly page: Page;
  readonly miraAIButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.miraAIButton = page.getByRole('link', { name: 'Mira AI' });
  }

  async gotoMiraAI() {
    await this.miraAIButton.click();
  }
}