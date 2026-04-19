import { Locator, Page, expect } from '@playwright/test';

export class NotificationBar {
  readonly page: Page;
  readonly notificationBarUpsellButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.notificationBarUpsellButton = page.getByTestId('notification-bar-upsell-button');
  }

  async expectNotificationBarUpsellButtonVisible() {
    await expect(this.notificationBarUpsellButton).toBeVisible();
  }
}