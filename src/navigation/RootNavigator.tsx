import { NavigationContainer } from "@react-navigation/native";
import React, { useContext } from "react";
import Loader from "../components/Loader/Loader";
import { AuthenticatedUserContext } from "../contexts/AuthContext/AuthenticatedUserContext";
import AppRoutesNavigator from "./AppRoutesNavigator";
import AuthNavigator from "./AuthNavigator";

const RootNavigator = () => {
  const { user, isAuthLoading } = useContext(AuthenticatedUserContext);
  if (isAuthLoading) {
    return <Loader loading={true} isShowLoaderText={true} />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutesNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;
