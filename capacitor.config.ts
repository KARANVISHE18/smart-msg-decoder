import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.c1e581ba7caa4f378d41d872442dc2e5',
  appName: 'SMS Guardian',
  webDir: 'dist',
  server: {
    url: 'https://c1e581ba-7caa-4f37-8d41-d872442dc2e5.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#6366f1',
      showSpinner: false
    }
  }
};

export default config;