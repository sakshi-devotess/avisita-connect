export interface ICurrentUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  mobilephone: string;
  active: boolean;
  validEmails: string[];
  password?: string;
  companyHasUserId?: number;
  __typename?: string;
  company_has_users: any[];
  company_id?: number;
  language?: string;
  file_id?: number;
  companyHasUserIds: number[];
  profile_picture?: string | null;
  firstActiveCompanyHasUserId: number | null;
}

export interface IAuthContext {
  user: ICurrentUser | null;
  setUser: (user: ICurrentUser | null) => void;
  setLoginState: (loggedIn: boolean) => void;
  isAuthLoading?: boolean;
}
