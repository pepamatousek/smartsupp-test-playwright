import { expect, Locator, Page } from '@playwright/test';
import { UserModals } from '../../../components/UserModals';

export class WorkflowPage {
  readonly page: Page;
  readonly workflowForm: Locator;
  readonly toneSlider: Locator;
  readonly continueButton: Locator;
  readonly welcomeMessageButtons: Locator;
  readonly publishButtonInForm: Locator;
  readonly publishButtonGlobal: Locator;
  readonly goBackButton: Locator;
  readonly userModals: UserModals;
  readonly toneOptions: Locator;
  readonly talkativenessOptions: Locator;
  readonly confidenceOptions: Locator;
  readonly emojiOptions: Locator;

  constructor(page: Page) {
    this.page = page;
    this.workflowForm = page.locator('#chatbot-workflow-form');
    this.toneSlider = page.getByTestId('chatbot-workflow-profile-input-tone');
    this.continueButton = page.getByTestId('chatbot-workflow-form-continue-btn');
    this.welcomeMessageButtons = page.locator("//div[contains(@data-testid, 'chatbot-workflow-section-welcomeMessage')]//div[@role='button']");
    this.publishButtonInForm = this.workflowForm.getByTestId('chatbot-workflow-form-publish-btn');
    this.publishButtonGlobal = page.getByTestId('chatbot-workflow-form-publish-btn');
    this.goBackButton = page.getByTestId('fullPageLayout-goBackBtn');
    this.toneOptions = page.locator("//div[contains(@data-testid, 'chatbot-workflow-profile-input-tone')]//following-sibling::div//p");
    this.talkativenessOptions = page.locator("//div[contains(@data-testid, 'chatbot-workflow-profile-input-talkativeness')]//following-sibling::div//p");
    this.confidenceOptions = page.locator("//div[contains(@data-testid, 'chatbot-workflow-profile-input-confidence')]//following-sibling::div//p");
    this.emojiOptions = page.locator("//div[contains(@data-testid, 'chatbot-workflow-profile-input-emoji')]//following-sibling::div//p");
    this.userModals = new UserModals(page);
  }

  async expectProfileStepVisible() {
    await expect(this.toneSlider).toBeVisible();
  }

  async selectToneOption(index: number = 0) {
    await this.toneOptions.nth(index).click();
  }

  async selectTalkativenessOption(index: number = 1) {
    await this.talkativenessOptions.nth(index).click();
  }

  async selectConfidenceOption(index: number = 0) {
    await this.confidenceOptions.nth(index).click();
  }

  async selectEmojiOption(index: number = 2) {
    await this.emojiOptions.nth(index).click();
  }

  async continueWorkflow() {
    await this.continueButton.click();
  }

  async continueWorkflowTwice() {
    await this.continueWorkflow();
    await this.continueWorkflow();
  }

  async selectWelcomeMessageOption(index: number = 1) {
    await this.welcomeMessageButtons.nth(index).click();
  }

  async expectPublishButtonVisible() {
    await expect(this.publishButtonInForm).toBeVisible();
  }

  async clickPublishButton(index: number = 1) {
    await this.publishButtonGlobal.nth(index).click();
  }


  async expectWorkflowButtonText(string: string) {
    await expect(this.workflowForm).toContainText(string);
  }

  async goBack() {
    await this.goBackButton.click();
  }
}