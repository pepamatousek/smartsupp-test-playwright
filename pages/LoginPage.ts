import { Locator, Page } from '@playwright/test';
import { getLoginCredentials } from '../utils/configLoader';

export class LoginPage {
  readonly page: Page;
  readonly languageButton: Locator;
  readonly languageCzechOption: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly message: Locator;
  readonly languageImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.languageButton = page.locator('//div[contains(@class, "language-picker__dropdown")]');
    this.languageCzechOption = page.locator('//img[contains(@alt, "Čeština")]');
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('button[type="submit"]');
    this.message = page.locator('#message');
    this.languageImage = page.locator("//div[contains(@class, 'language-picker__dropdown')]//img").first();
  }

  async gotoLoginPage() {
    await this.page.goto('https://openid.smartsupp.com/');
  }

  async setLangageToCzech() {
    await this.languageButton.click();
    await this.languageCzechOption.click();
  }

  async checkCzechLanguageImage(onMismatch?: () => Promise<void> | void): Promise<boolean> {
    await this.languageImage.waitFor({ state: 'visible' });
    const altText = (await this.languageImage.getAttribute('alt'))?.trim();
    const isCzech = altText === 'Čeština';

    if (!isCzech && onMismatch) {
      await onMismatch();
    }

    return isCzech;
  }

  async login(): Promise<void>;
  async login(username: string, password: string): Promise<void>;
  async login(username?: string, password?: string): Promise<void> {
    const credentials = username && password
      ? { username, password }
      : getLoginCredentials();

    await this.usernameInput.fill(credentials.username);
    await this.passwordInput.fill(credentials.password);
    await this.loginButton.click();
  }
}