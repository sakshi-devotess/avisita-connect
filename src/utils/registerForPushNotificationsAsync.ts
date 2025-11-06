import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    throw new Error(
      "Permission not granted to get push token for push notification!"
    );
  }
  const projectId = Constants?.expoConfig?.extra?.eas?.projectId;

  if (!projectId) {
    throw new Error("Project ID not found");
  }
  try {
    const pushTokenString = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    if (!pushTokenString) {
      throw new Error("Failed to get push token for push notification!");
    }

    return pushTokenString?.data ?? "";
  } catch (e: unknown) {
    throw new Error(`${e}`);
  }
}
