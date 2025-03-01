// Learn more https://docs.expo.io/guides/customizing-metro
// This replaces `const { getDefaultConfig } = require('expo/metro-config');`
// eslint-disable-next-line import/order
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getSentryExpoConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
