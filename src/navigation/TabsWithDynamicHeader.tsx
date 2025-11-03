import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { StyleSheet, Text } from "react-native";
import TabNavigator from "./TabNavigator";

const routeTitleMap: Record<string, string> = {
  Dashboard: "Home",
};

const CustomHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <>
    <Text style={styles.title}>{title}</Text>
    {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
  </>
);

const TabsWithDynamicHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Dashboard";

  useLayoutEffect(() => {
    const title = routeTitleMap[routeName];

    navigation.setOptions({
      headerTitle: () => <CustomHeader title={title} />,
    });
  }, [route, navigation]);

  return <TabNavigator />;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
  },
});
export default TabsWithDynamicHeader;
