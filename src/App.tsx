import { ApolloProvider } from "@apollo/client/main.cjs";
import * as Sentry from "@sentry/react-native";
import * as Notifications from "expo-notifications";
import { config } from "./config/constants";
import { AuthenticatedUserProvider } from "./contexts/AuthContext/AuthenticatedUserContext";
import MessageProvider from "./contexts/MessageContext/MessageContext";
import { NotificationProvider } from "./contexts/NotificationContext/NotificationContext";
import RootNavigator from "./navigation/RootNavigator";
import { client } from "./services/graphql/graphql";

Sentry.init({
  // dsn: "https://d1e37d6529616beff5319baff098a524@o4510317028048896.ingest.de.sentry.io/4510317029556304",
  dsn: config.sentryDsn,

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});
export default Sentry.wrap(function App() {
  return (
    <NotificationProvider>
      <ApolloProvider client={client}>
        <AuthenticatedUserProvider>
          <MessageProvider>
            <RootNavigator />
          </MessageProvider>
        </AuthenticatedUserProvider>
      </ApolloProvider>
    </NotificationProvider>
  );
});
