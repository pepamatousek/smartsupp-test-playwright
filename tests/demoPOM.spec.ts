import { test } from '@playwright/test';
import { SmartsuppPage } from '../pages/SmartsuppPage';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { OnBoardingPage } from '../pages/ai-automations/OnBoardingPage';
import { WorkflowPage } from '../pages/ai-automations/ai-chatbots/WorkflowPage';
import { AIChatbotsPage } from '../pages/ai-automations/AIChatbotsPage';
import { SourcePage } from '../pages/ai-automations/SourcePage';

test.describe('AI Assistant Creation Flow', () => {

  test('Create AI Assistant', async ({ page }) => {
    const smartsuppPage = new SmartsuppPage(page);
    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const onBoardingPage = new OnBoardingPage(page);
    const aiChatbotsPage = new AIChatbotsPage(page);
    const sourcePage = new SourcePage(page);
    const workflowPage = new WorkflowPage(page);

    await test.step('Navigate to Smartsupp and sign in', async () => {
      await smartsuppPage.gotoSmartsuppPage();
      await smartsuppPage.confirmCookies();
      await smartsuppPage.signUp();
      await loginPage.login();
    });

    await test.step('Verify home page and navigate to Mira AI', async () => {
      await homePage.notificationBar.expectNotificationBarUpsellButtonVisible();
      await homePage.userModals.confirmBrowserNotificationIfVisible(3000);
      await homePage.navbar.gotoMiraAI();
    });

    await test.step('Clean up existing data if needed', async () => {
      if (!await onBoardingPage.waitUntilOnPath('/ai-automations/onboarding', 2000)) {
        await aiChatbotsPage.deleteAllChatbotsIfCheckboxIsEnabled();
      }
      if (!await onBoardingPage.waitUntilOnPath('/ai-automations/onboarding', 2000)) {
        await aiChatbotsPage.openAiSourcesSubmenu();
        await sourcePage.deleteAllSourcesIfCheckboxIsEnabled();
        await sourcePage.openAiChatbotsSubmenu();
      }
    });

    await test.step('Complete onboarding wizard', async () => {
      await onBoardingPage.continueOnboarding();
      await onBoardingPage.selectOfferServices();
      await onBoardingPage.continueOnboarding();
      await onBoardingPage.fillWebsiteUrl('https://www.example.com');
      await onBoardingPage.clickLoadPages();
      await onBoardingPage.continueOnboarding();
      await onBoardingPage.fillAssistantName('Můj AI Asistent');
      await onBoardingPage.selectAvatarTwo();
      await onBoardingPage.continueOnboarding();
      await onBoardingPage.expectDoneLabel('Hotovo');
      await onBoardingPage.continueOnboarding();
    });

    await test.step('Configure workflow profile', async () => {
      await workflowPage.expectProfileStepVisible();
      await workflowPage.selectToneOption(0);
      await workflowPage.selectTalkativenessOption(1);
      await workflowPage.selectConfidenceOption(0);
      await workflowPage.selectEmojiOption(2);
      await workflowPage.continueWorkflowTwice();
      await workflowPage.selectWelcomeMessageOption(1);
      await workflowPage.continueWorkflowTwice();
    });

    await test.step('Publish and deactivate workflow', async () => {
      await workflowPage.expectPublishButtonVisible();
      await workflowPage.clickPublishButton(1);
      await workflowPage.userModals.expectConfirmModalButtonVisible();
      await workflowPage.userModals.confirmPublish();
      await workflowPage.expectWorkflowButtonText('Deaktivovat');
      await workflowPage.goBack();
    });

    await test.step('Verify chatbot and clean up', async () => {
      await aiChatbotsPage.expectChatbotCardTitleContains('Můj první AI nákupní asistent');
      await aiChatbotsPage.deleteAllChatbots();
      await aiChatbotsPage.openAiSourcesSubmenu();
      await sourcePage.deleteAllSources();
    });

    await test.step('Logout and verify login screen', async () => {
      await sourcePage.logoutAndExpectLoginScreen();
    });
  });
});
