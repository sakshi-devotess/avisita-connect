import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { colors } from "../config/constants";
import { TAB_ROUTES } from "../routes/tabRoutesConfigs";

const Tab = createBottomTabNavigator();
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        headerTitleAlign: "left",
        headerBackTitleVisible: false,
      })}
    >
      {TAB_ROUTES.map(
        ({ name, component: Component, label, icon, focusedIcon }) => (
          <Tab.Screen
            key={name}
            name={name}
            options={() => {
              return {
                tabBarLabel: label,
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons
                    name={focused ? focusedIcon ?? icon : icon}
                    size={size}
                    color={color}
                  />
                ),
              };
            }}
          >
            {(props) => <Component {...props} />}
          </Tab.Screen>
        )
      )}
    </Tab.Navigator>
  );
};
export default TabNavigator;
