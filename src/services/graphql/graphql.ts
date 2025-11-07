import { config } from "@/src/config/constants";
// import {
//   clearUserProfile,
//   getUserProfile,
//   saveUserProfile,
// } from "@/src/storage/userStorage";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import {
  ApolloClient,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  Observable,
} from "@apollo/client/main.cjs";
import { refreshToken } from "../auth/refreshToken";

let refreshPromise: Promise<{
  access_token: string;
  refresh_token: string;
}> | null = null;

export const getNewToken = (
  oldRefreshToken: string,
  parsedData: any
): Promise<{
  access_token: string;
  refresh_token: string;
}> => {
  if (refreshPromise) return refreshPromise;
  refreshPromise = refreshToken(oldRefreshToken)
    .then(async (response) => {
      const { access_token, refresh_token: newRefreshToken } = response;
      const updatedUserData = {
        ...parsedData,
        access_token,
        refresh_token: newRefreshToken,
      };

      // await saveUserProfile(updatedUserData);

      return {
        access_token,
        refresh_token: newRefreshToken,
      };
    })
    .catch(async (err) => {
      console.error("Refresh failed:", err);
      // await clearUserProfile();
      throw err;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err?.extensions?.code) {
          case "UNAUTHENTICATED": {
            //get refresh token from store
            const refreshAndRetry = async () => {
              try {
                // const parsedData = await getUserProfile();
                const parsedData = null; // Placeholder since getUserProfile is commented out
                if (!parsedData) throw new Error("No user data in SecureStore");

                const { access_token } = await getNewToken(
                  parsedData.refresh_token,
                  parsedData
                );

                // Update request with new token
                const oldHeaders = operation.getContext().headers;
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${access_token}`,
                  },
                });
                return access_token;
              } catch (error) {
                // await clearUserProfile();
                return null;
              }
            };

            return fromPromise(refreshAndRetry())
              .filter(Boolean)
              .flatMap(() => forward(operation));
          }
          case "FORBIDDEN":
            alert("Forbidden to access the resource");
            break;
        }
      }

      const definitions: any = operation.query.definitions[0];
      if (definitions.operation !== "mutation") {
        return new Observable((observer) => {
          let subscription: any;
          const timer = setTimeout(() => {
            subscription = forward(operation).subscribe({
              next: (res) => {
                if (res?.errors?.length) {
                  observer.error(res.errors[0]);
                  return;
                }
                observer.next(res);
              },
              error: (err) => {
                observer.error(err);
              },
              complete: () => {
                observer.complete();
              },
            });
          }, 1000);

          return () => {
            clearTimeout(timer);
            if (subscription) subscription.unsubscribe();
          };
        });
      }
    }
    if (networkError) {
      return new Observable((observer) => observer.error(networkError));
    }
  }
);

const httpLink = new HttpLink({ uri: config.graphQlUrl, fetch });

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const storedUserData = await getUserProfile();
  const storedUserData = null; // Placeholder since getUserProfile is commented out
  const token = storedUserData ? storedUserData.access_token : null;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const cache = new InMemoryCache();
export const client = new ApolloClient({
  cache: cache,
  link: authLink.concat(from([errorLink, httpLink])),

  defaultOptions: {
    watchQuery: {
      fetchPolicy: "network-only",
      nextFetchPolicy: "cache-and-network",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "network-only",
      errorPolicy: "all",
    },
    mutate: {
      errorPolicy: "all",
    },
  },
});
