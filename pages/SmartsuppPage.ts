import { Locator, Page } from '@playwright/test';

export class SmartsuppPage {
  readonly page: Page;
  readonly confirmCookiesButton: Locator;
  readonly signButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.confirmCookiesButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
    this.signButton = page.getByRole('link', { name: 'Přihlásit se' });
  }

  async gotoSmartsuppPage() {
    await this.page.goto('https://www.smartsupp.com/cs/');
  }

  async confirmCookies() {
    await this.confirmCookiesButton.click();
  }

  async signUp() {
    await this.signButton.click();
  }
}