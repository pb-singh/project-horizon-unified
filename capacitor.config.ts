
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.bf88d849ff2c4786967e1bd339d3ee38',
  appName: 'TaskMaster - Smart Task Manager',
  webDir: 'dist',
  server: {
    url: 'https://bf88d849-ff2c-4786-967e-1bd339d3ee38.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#3B82F6',
      showSpinner: false
    }
  }
};

export default config;
