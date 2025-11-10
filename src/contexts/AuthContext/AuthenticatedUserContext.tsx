import { GET_CURRENT_USER } from "@/src/services/graphql/queries";
import {
  clearUserProfile,
  getUserProfile,
  saveUserProfile,
} from "@/src/userStorage/userStorage";
import { setLogoutFn } from "@/src/utils/logout";
import { useQuery } from "@apollo/client";
import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IAuthContext, ICurrentUser } from "./AuthenticatedUserContext.model";

export const AuthenticatedUserContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  setLoginState: () => {},
  isAuthLoading: false,
});

export const AuthenticatedUserProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [user, setUser] = useState<ICurrentUser | null>(null);
  const [loginState, setLoginState] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const parsedUser = await getUserProfile();
        if (parsedUser?.companyHasUserId) {
          setUser(parsedUser);
          setLoginState(true);
        }
      } catch (error) {
        console.error("Error accessing SecureStore:", error);
      } finally {
        setIsAuthLoading(false);
      }
    };
    checkUser();
  }, []);

  const { data } = useQuery(GET_CURRENT_USER, {
    skip: loginState,
    fetchPolicy: "cache-and-network",
  });

  useEffect(() => {
    const loadUserData = async () => {
      if (!loginState) return;
      if (!data || Object.keys(data).length === 0) {
        return;
      }

      const response: any = Object.values(data)[0];
      if (!response?.company_has_users) {
        return;
      }

      const sortedCompanyHasUsers = [...response.company_has_users].sort(
        (a, b) => Number(a.created) - Number(b.created)
      );
      const companyHasUserIds = sortedCompanyHasUsers?.map((cu) => cu.id) || [];
      const firstActiveCompanyHasUser = sortedCompanyHasUsers.find(
        (cu) => cu.active
      );
      const defaultCompanyHasUserId = sortedCompanyHasUsers[0]?.id;
      const selectedCompanyHasUserId =
        user?.companyHasUserId || defaultCompanyHasUserId;

      const companyHasUser = response.company_has_users.find(
        (cu: any) => cu.id === selectedCompanyHasUserId
      );

      const currentUser: ICurrentUser = {
        ...response,
        companyHasUserId: selectedCompanyHasUserId,
        company_id: companyHasUser?.company_id,
        companyHasUserIds: companyHasUserIds,
        firstActiveCompanyHasUserId: firstActiveCompanyHasUser?.id || null,
      };
      const parsedUser = await getUserProfile();
      if (parsedUser) {
        const updatedUserData = {
          ...parsedUser,
          ...currentUser,
        };
        await saveUserProfile(updatedUserData);
      }
      setUser(currentUser);
    };
    loadUserData();
  }, [data, loginState]);

  useEffect(() => {
    setLogoutFn(async () => {
      await clearUserProfile();
      setUser(null);
      setLoginState(false);
    });
  }, []);

  const value = useMemo(
    () => ({ user, setUser, setLoginState, isAuthLoading }),
    [user, loginState, isAuthLoading]
  );

  return (
    <AuthenticatedUserContext.Provider value={value}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
