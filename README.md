# Smartsupp – Playwright E2E testy

End-to-end testy pro webovou aplikaci [Smartsupp](https://www.smartsupp.com) postavené na **Playwright** s **TypeScript** a vzoru **Page Object Model**.

## Struktura projektu

```
tests/              # Testové specifikace
pages/              # Page Object třídy (BasePage, LoginPage, …)
  ai-automations/   # Stránky pro AI Automations modul
    ai-chatbots/    # Workflow stránky chatbotů
components/         # Sdílené UI komponenty (Navbar, UserModals, …)
utils/              # Helpery (configLoader)
testConfig/         # Konfigurační soubory (credentials)
playwright.config.ts
```

## Požadavky

- **Node.js** ≥ 18
- **npm** (součást Node.js)

## Instalace

```bash
# 1. Klonování repozitáře
git clone https://github.com/<org>/smartsupp-test-playwright.git
cd smartsupp-test-playwright

# 2. Instalace závislostí
npm install

# 3. Instalace prohlížečů pro Playwright
npx playwright install
```

## Konfigurace přihlašovacích údajů

Credentials se načítají přes **environment proměnné** (preferovaný způsob) nebo z lokálního JSON souboru.

### Varianta A – `.env` soubor (doporučeno)

Vytvořte soubor `.env` v kořenu projektu:

```env
TEST_USERNAME=vas-email@example.com
TEST_PASSWORD=vase-heslo
APP_URL=https://www.smartsupp.com/cs/
```

### Varianta B – `loginConfig.json`

Zkopírujte šablonu a vyplňte údaje:

```bash
cp testConfig/loginConfig.example.json testConfig/loginConfig.json
```

```json
{
  "LOGIN": {
    "USERNAME": "vas-email@example.com",
    "PASSWORD": "vase-heslo"
  },
  "APP_URL": "https://www.smartsupp.com/cs/"
}
```

> **Oba soubory (`.env`, `loginConfig.json`) jsou v `.gitignore` – necommitujte je.**

## Spuštění testu

```bash
# S viditelným prohlížečem chrom (headed mód)
npx playwright test --project=chromium --headed
```

## Zobrazení výsledků

```bash
# Otevření HTML reportu po doběhnutí testů
npx playwright show-report
```

Screenshoty z neúspěšných testů se ukládají do `test-results/`.

## Konfigurace

Hlavní nastavení je v `playwright.config.ts`:

| Parametr | Hodnota |
|---|---|
| Viewport | 1920 × 1080 |
| Action timeout | 10 s |
| Navigation timeout | 10 s |
| Expect timeout | 30 s |
| Trace | při prvním retry |
| Screenshot | při selhání |
