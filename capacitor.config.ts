import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'MoneyManager',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
