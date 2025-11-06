const { getDefaultConfig } = require("@expo/metro-config");
const projectRoot = __dirname;
const defaultConfig = getDefaultConfig(projectRoot);
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push("cjs");

module.exports = config;
