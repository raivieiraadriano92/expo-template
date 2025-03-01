import * as Sentry from "@sentry/react-native";
import { isRunningInExpoGo } from "expo";

// Construct a new integration instance. This is needed to communicate between the integration and React
export const navigationIntegration = Sentry.reactNavigationIntegration({
  enableTimeToInitialDisplay: !isRunningInExpoGo()
});

export const initSentry = () => {
  if (__DEV__) {
    return;
  }

  const sentryDns = process.env.EXPO_PUBLIC_SENTRY_DNS;

  if (!sentryDns) {
    throw new Error("Missing env var: EXPO_PUBLIC_SENTRY_DNS");
  }

  Sentry.init({
    dsn: sentryDns,
    debug: false,
    // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
    // We recommend adjusting this value in production.
    tracesSampleRate: 1.0,
    // profilesSampleRate is relative to tracesSampleRate.
    // Here, we'll capture profiles for 100% of transactions.
    profilesSampleRate: 1.0,
    integrations: [
      // Pass integration
      navigationIntegration
    ],
    enableNativeFramesTracking: !isRunningInExpoGo() // Tracks slow and frozen frames in the application
  });
};
