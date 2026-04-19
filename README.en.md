# Smartsupp - Playwright E2E Tests

End-to-end tests for the [Smartsupp](https://www.smartsupp.com) web application built with **Playwright**, **TypeScript**, and the **Page Object Model** pattern.

## Project Structure

```
tests/              # Test specifications
pages/              # Page Object classes (BasePage, LoginPage, ...)
  ai-automations/   # Pages for the AI Automations module
    ai-chatbots/    # Chatbot workflow pages
components/         # Shared UI components (Navbar, UserModals, ...)
utils/              # Helpers (configLoader)
testConfig/         # Configuration files (credentials)
playwright.config.ts
```

## Requirements

- **Node.js** >= 18
- **npm** (included with Node.js)

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/pepamatousek/smartsupp-test-playwright.git
cd smartsupp-test-playwright

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install
```

## Login Credentials Configuration

Credentials are loaded from **environment variables** (preferred option) or from a local JSON file.

### Option A - `.env` File (Recommended)

Create a `.env` file in the project root:

```env
TEST_USERNAME=your-email@example.com
TEST_PASSWORD=your-password
APP_URL=https://www.smartsupp.com/cs/
```

### Option B - `loginConfig.json`

Copy the template and fill in your credentials:

```bash
cp testConfig/loginConfig.example.json testConfig/loginConfig.json
```

```json
{
  "LOGIN": {
    "USERNAME": "your-email@example.com",
    "PASSWORD": "your-password"
  },
  "APP_URL": "https://www.smartsupp.com/cs/"
}
```

> **Both files (`.env`, `loginConfig.json`) are listed in `.gitignore` - do not commit them.**

## Running Tests

```bash
# With a visible browser window with chrome (headed mode)
npx playwright test --project=chromium --headed
```

## Viewing Results

```bash
# Open the HTML report after the tests finish
npx playwright show-report
```

Screenshots from failed tests are saved to `test-results/`.

## Configuration

The main settings are defined in `playwright.config.ts`:

| Parameter | Value |
|---|---|
| Viewport | 1920 x 1080 |
| Action timeout | 20 s |
| Navigation timeout | 20 s |
| Expect timeout | 20 s |
| Trace | on first retry |
| Screenshot | on failure |
