import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '../BasePage';

export class OnBoardingPage extends BasePage {
  readonly onboardingPrimaryButton: Locator;
  readonly offerServicesButton: Locator;
  readonly onboardingWebUrlInput: Locator;
  readonly loadPagesButton: Locator;
  readonly assistantNameInput: Locator;
  readonly avatarOptionTwo: Locator;
  readonly doneLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.onboardingPrimaryButton = page.getByTestId('ai-onboarding-primary-button');
    this.offerServicesButton = page.getByTestId('ai-onboarding-survey-option-web');
    this.onboardingWebUrlInput = page.getByTestId('ai-onboarding-input-web-url');
    this.loadPagesButton = page.getByRole('button', { name: 'Načíst stránky' });
    this.assistantNameInput = page.getByTestId('chatbot-identity-modal-name-input');
    this.avatarOptionTwo = page.locator('img[src*="chatbots/avatars/2.webp"]');
    this.doneLabel = page.locator('span[id^="popover-trigger-"]', { hasText: 'Hotovo' });
  }

  async continueOnboarding() {
    await expect(this.onboardingPrimaryButton).toBeVisible();
    await this.onboardingPrimaryButton.click();
  }

  async selectOfferServices() {
    await expect(this.offerServicesButton).toBeVisible();
    await this.offerServicesButton.click();
  }

  async fillWebsiteUrl(url: string) {
    await expect(this.onboardingWebUrlInput).toBeVisible();
    await this.onboardingWebUrlInput.fill(url);
  }

  async clickLoadPages() {
    await expect(this.loadPagesButton).toBeVisible();
    await this.loadPagesButton.click();
  }

  async fillAssistantName(name: string) {
    await expect(this.assistantNameInput).toBeVisible();
    await this.assistantNameInput.fill(name);
  }

  async selectAvatarTwo() {
    await expect(this.avatarOptionTwo).toBeVisible();
    await this.avatarOptionTwo.click();
  }

  async expectDoneLabel(name: string) {
    await expect(this.doneLabel).toBeVisible();
    await expect(this.doneLabel).toHaveText(name);
  }
}