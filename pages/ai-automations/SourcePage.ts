import { expect, Locator, Page } from '@playwright/test';
import { UserModals } from '../../components/UserModals';

export class SourcePage {
  readonly page: Page;
  readonly bulkSourceCheckboxInput: Locator;
  readonly bulkSourceCheckboxControl: Locator;
  readonly deleteButton: Locator;
  readonly sidebarAgentProfile: Locator;
  readonly logoutButton: Locator;
  readonly loginHeading: Locator;
  readonly userModals: UserModals;
  readonly submenuAiAutomationsAiChatbots: Locator;

  constructor(page: Page) {
    this.page = page;
    this.bulkSourceCheckboxInput = page.locator('.chakra-checkbox__input').first();
    this.bulkSourceCheckboxControl = page.locator('.chakra-checkbox__control').first();
    this.deleteButton = page.getByRole('button', { name: 'Smazat' });
    this.sidebarAgentProfile = page.getByTestId('sidebar-agent-profile');
    this.logoutButton = page.getByTestId('logout');
    this.loginHeading = page.getByRole('heading', { name: 'Přihlaste se' });
    this.userModals = new UserModals(page);
    this.submenuAiAutomationsAiChatbots = page.getByTestId('submenu-ai-automations-ai-chatbots');
  }

  async selectBulkSourceCheckbox() {
    await this.bulkSourceCheckboxControl.click();
  }

  async clickDeleteButton() {
    await this.deleteButton.click();
  }

  async deleteAllSources() {
    await this.selectBulkSourceCheckbox();
    await this.clickDeleteButton();
    await this.userModals.confirmDelete();
  }

  async openAgentProfile() {
    await this.sidebarAgentProfile.click();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async expectLoginHeadingVisible() {
    await expect(this.loginHeading).toBeVisible();
  }

  async logoutAndExpectLoginScreen() {
    await this.openAgentProfile();
    await this.logout();
    await this.expectLoginHeadingVisible();
  }

  async deleteAllSourcesIfCheckboxIsEnabled() {
    await expect(this.bulkSourceCheckboxInput).toBeVisible();
    const isEnabled = await this.bulkSourceCheckboxInput.isEnabled();
    if (isEnabled) {
      await this.deleteAllSources();
    }
  }

  async openAiChatbotsSubmenu() {
    await this.submenuAiAutomationsAiChatbots.click();
  }
}