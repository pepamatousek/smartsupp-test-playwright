import { Page, expect } from '@playwright/test';

export class BasePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async expectUrl(expected: string | RegExp) {
        await expect(this.page).toHaveURL(expected);
    }

    async expectUrlContains(partial: string) {
        await expect(this.page).toHaveURL(new RegExp(partial));
    }

    async getCurrentUrl(): Promise<string> {
        return this.page.url();
    }

    isOnPath(path: string): boolean {
        console.log(`Current URL: ${this.page.url()}, checking for path: ${path}`);
        return this.page.url().includes(path);
    }

    async waitUntilOnPath(path: string, timeout = 2000): Promise<boolean> {
        try {
            await this.page.waitForURL(
                url => url.href.includes(path),
                { timeout }
            );
            return true;
        } catch {
            return false;
        }
    }

    async reload() {
        await this.page.reload();
    }
}