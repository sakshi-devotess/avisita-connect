import TabsWithDynamicHeader from "../navigation/TabsWithDynamicHeader";

export const STACK_ROUTES = {
  TABS: "Tabs",
};

export interface DrawerRouteConfig {
  name: string;
  component: React.ComponentType<any>;
  title?: string;
  customOptions?: () => {
    headerShown?: boolean;
  };
}

export const STACK_NAVIGATION_ROUTES: DrawerRouteConfig[] = [
  {
    name: STACK_ROUTES.TABS,
    component: TabsWithDynamicHeader,
    customOptions: () => ({
      headerShown: true,
    }),
  },
];
