import Login from "../screens/Auth/Login/Login";

export const AUTH_ROUTE = {
  LOGIN: "Login",
};

export const AUTH_ROUTES = [
  {
    name: AUTH_ROUTE.LOGIN,
    component: Login,
  },
];
