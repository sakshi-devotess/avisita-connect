import { ApolloProvider } from "@apollo/client/main.cjs";
import { AuthenticatedUserProvider } from "./contexts/AuthContext/AuthenticatedUserContext";
import MessageProvider from "./contexts/MessageContext/MessageContext";
import RootNavigator from "./navigation/RootNavigator";
import { client } from "./services/graphql/graphql";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AuthenticatedUserProvider>
        <MessageProvider>
          <RootNavigator />
        </MessageProvider>
      </AuthenticatedUserProvider>
    </ApolloProvider>
  );
}
