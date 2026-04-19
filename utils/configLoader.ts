import * as path from 'node:path';
import * as fs from 'node:fs';

const loginConfigPath = path.join(__dirname, '..', 'testConfig', 'loginConfig.json');
const localLoginConfig = fs.existsSync(loginConfigPath)
  ? JSON.parse(fs.readFileSync(loginConfigPath, 'utf-8'))
  : {};

export const loginConfigData = {
  appUrl: process.env.APP_URL || localLoginConfig.APP_URL || 'https://www.smartsupp.com/cs/',
  username: process.env.TEST_USERNAME || localLoginConfig.LOGIN?.USERNAME,
  password: process.env.TEST_PASSWORD || localLoginConfig.LOGIN?.PASSWORD,
};


export function loadLoginConfig(): { LOGIN: { USERNAME: string; PASSWORD: string }; APP_URL: string } {
  return localLoginConfig;
}

export function getLoginCredentials(): { username: string; password: string } {
  return {
    username: loginConfigData.username,
    password: loginConfigData.password,
  };
}

export function getAppUrl(): string {
  return loginConfigData.appUrl;
}