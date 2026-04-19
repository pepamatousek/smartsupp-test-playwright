import { Page, Locator, expect } from '@playwright/test';

export class UserModals {
  readonly page: Page;
  readonly browserToast: Locator;
  readonly browserContinueButton: Locator;
  readonly confirmModalButton: Locator;
  readonly deleteModalButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.browserToast = page.locator("//div[contains(@id, 'chakra-toast-manager-top-left')]").nth(2);
    this.browserContinueButton = page
      .locator("//button[@data-testid='notification-browser-continue']")
      .nth(2);
    this.confirmModalButton = page.getByTestId('confirm-modal-cancel');
    this.deleteModalButton = page.getByTestId('delete-modal-confirm');
  }

  async confirmBrowserNotification() {
    await expect(this.browserToast).toBeVisible();
    await expect(this.browserContinueButton).toBeVisible();
    await this.browserContinueButton.click();
  }

  async expectConfirmModalButtonVisible() {
    await expect(this.confirmModalButton).toBeVisible();
  }

  async confirmPublish() {
    await this.confirmModalButton.click();
  }

  async confirmDelete() {
    await this.deleteModalButton.click();
  }

async confirmBrowserNotificationIfVisible(timeout = 3000) {
  const isVisible = await this.browserToast
    .waitFor({ state: 'visible', timeout })
    .then(() => true)
    .catch(() => false);

  if (isVisible) {
    await this.confirmBrowserNotification();
  }
}

}