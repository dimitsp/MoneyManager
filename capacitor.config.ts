import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.dimtsp.moneymanager',
  appName: 'Money Manager',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
