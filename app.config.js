import "dotenv/config";
export default {
  expo: {
    name: "avisita-connect",
    slug: "avisita",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "avisitaApp",
    userInterfaceStyle: "automatic",
    deepLinking: true,
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/icon.png",
        backgroundImage: "./assets/images/icon.png",
        monochromeImage: "./assets/images/icon.png",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      package: "com.avisita.app",
      googleServicesFile: "google-services.json",
    },
    web: {
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-secure-store",
      "expo-notifications",
      [
        "@sentry/react-native/expo",
        {
          url: "https://sentry.io/",
          project: "avisita",
          organization: "avisita",
          experimental_android: {
            enableAndroidGradlePlugin: true,
          },
        },
      ],
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
          dark: {
            backgroundColor: "#000000",
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
      reactCompiler: true,
    },
    extra: {
      eas: {
        projectId: "06f83e98-c2b6-4f31-950c-0cf2cdc85820",
        // projectId: process.env.EXPO_PROJECT_ID,
      },
      publicUrl: process.env.REACT_APP_PUBLIC_URL,
      graphQlUrl: process.env.REACT_APP_GRAPHQL_URL,
      sentryDsn: process.env.SENTRY_DSN,
    },
  },
};
