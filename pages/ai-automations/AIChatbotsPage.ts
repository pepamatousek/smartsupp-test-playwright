import { expect, Locator, Page } from '@playwright/test';
import { UserModals } from '../../components/UserModals';
import { BasePage } from '../BasePage';

export class AIChatbotsPage extends BasePage {
  readonly chatbotCardTitleText: Locator;
  readonly bulkChatbotCheckboxInput: Locator;
  readonly bulkChatbotCheckboxControl: Locator;
  readonly deleteButton: Locator;
  readonly userModals: UserModals;
  readonly submenuAiAutomationsAiSources: Locator;

  constructor(page: Page) {
    super(page);
    this.chatbotCardTitleText = page.getByTestId('chatbot-card-title-text');
    this.bulkChatbotCheckboxInput = page.locator('.chakra-checkbox__input').first();
    this.bulkChatbotCheckboxControl = page.locator('.chakra-checkbox__control').first();
    this.deleteButton = page.getByRole('button', { name: 'Smazat' });
    this.userModals = new UserModals(page);
    this.submenuAiAutomationsAiSources = page.getByTestId('submenu-ai-automations-ai-sources');
  }

  async expectChatbotCardTitleContains(title: string) {
    await expect(this.chatbotCardTitleText).toContainText(title);
  }

  async selectBulkChatbotCheckbox() {
    await this.bulkChatbotCheckboxControl.click();
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async deleteAllChatbots() {
    await this.selectBulkChatbotCheckbox();
    await this.clickDeleteButton();
    await this.userModals.confirmDelete();
  }

  async deleteAllChatbotsIfCheckboxIsEnabled() {
    await expect(this.bulkChatbotCheckboxInput).toBeVisible();
    const isEnabled = await this.bulkChatbotCheckboxInput.isEnabled();
    if (isEnabled) {
      await this.deleteAllChatbots();
    }
  }

  async openAiSourcesSubmenu() {
    await this.submenuAiAutomationsAiSources.click();
  }
}