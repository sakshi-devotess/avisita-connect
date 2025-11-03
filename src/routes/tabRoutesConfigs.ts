import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import Dashboard from "../screens/Auth/Dashboard/Dashboard";

export const TAB_ROUTE = {
  DASHBOARD: "Dashboard",
};
type IoniconName = ComponentProps<typeof Ionicons>["name"];

export interface TabRouteConfig {
  name: (typeof TAB_ROUTE)[keyof typeof TAB_ROUTE];
  component: React.ComponentType<any>;
  label: string;
  icon: IoniconName;
  focusedIcon?: IoniconName;
}

export const TAB_ROUTES: TabRouteConfig[] = [
  {
    name: TAB_ROUTE.DASHBOARD,
    component: Dashboard,
    label: "Home",
    icon: "home",
    focusedIcon: "home-outline",
  },
];
