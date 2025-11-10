import { pushMessage } from "@/src/utils/message";
import React, { createContext, useCallback, useMemo } from "react";
import Toast from "react-native-toast-message";
import { IMessageProviderProps } from "./MessageContext.model";

export const MessageContext = createContext({
  pushMessageFromMutationResponse: (_mutationResponse: any) => {},
  pushMessageFromRequest: (_response: any) => {},
});

const MessageProvider: React.FC<IMessageProviderProps> = ({ children }) => {
  const pushMessageFromMutationResponse = useCallback(
    (mutationResponse: any) => {
      pushMessage(mutationResponse);
    },
    []
  );

  const pushMessageFromRequest = useCallback((response: any) => {
    pushMessage(response);
  }, []);

  const contextValue = useMemo(
    () => ({
      pushMessageFromMutationResponse,
      pushMessageFromRequest,
    }),
    [pushMessageFromMutationResponse, pushMessageFromRequest]
  );

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
      <Toast />
    </MessageContext.Provider>
  );
};

export default MessageProvider;
