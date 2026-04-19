import { Page } from '@playwright/test';
import { Navbar } from '../components/Navbar';
import { UserModals } from '../components/UserModals';
import { NotificationBar } from '../components/NotificationBar';

export class HomePage {
  readonly page: Page;
  readonly userModals: UserModals;
  readonly navbar: Navbar;
  readonly notificationBar: NotificationBar;

  constructor(page: Page) {
    this.page = page;
    this.userModals = new UserModals(page);
    this.navbar = new Navbar(page);
    this.notificationBar = new NotificationBar(page);
  }

  async gotoHomePage() {
    await this.page.goto('app/dashboard/home');
  }
}