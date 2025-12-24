import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.myapp.ionic',
  appName: 'myApp',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    url: 'http://localhost:5173',
    cleartext: true
  }
};

export default config;

