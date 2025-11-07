import AsyncStorage from "@react-native-async-storage/async-storage";
const USER_PROFILE_KEY = "userProfile";

export async function saveUserProfile<T>(profile: T) {
  await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}

export async function getUserProfile<T = any>(): Promise<T | null> {
  const raw = await AsyncStorage.getItem(USER_PROFILE_KEY);
  return raw ? (JSON.parse(raw) as T) : null;
}

export async function clearUserProfile() {
  await AsyncStorage.removeItem(USER_PROFILE_KEY);
}
