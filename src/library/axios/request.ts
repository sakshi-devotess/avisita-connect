import { getNewToken } from "@/src/services/graphql/graphql";
import { getUserProfile } from "@/src/storage/userStorage";
import { logout } from "@/src/utils/logout";
import { pushMessage } from "@/src/utils/message";
import axios, { AxiosResponse } from "axios";
import Toast from "react-native-toast-message";
import { config } from "../../config/constants";

const request = axios.create({
  baseURL: config.publicUrl,
  timeout: 1 * 60 * 1000, // 1 minute
  headers: {
    Accept: "application/json",
  },
});
request.interceptors.request.use(
  async (config) => {
    try {
      const parsedData = await getUserProfile();
      if (!parsedData) return config;
      config.headers = config.headers || {};
      const { access_token } = parsedData;

      if (access_token && config.headers) {
        config.headers.Authorization = `Bearer ${access_token}`;
      }

      return config;
    } catch (error) {
      console.warn("Interceptor auth error:", error);
      return config;
    }
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const parsedData = await getUserProfile();
    const { response } = error;
    const prevRequestConfig = error.config;
    switch (response?.status) {
      case 401:
        if (
          !prevRequestConfig.headers["X-RefreshToken"] &&
          parsedData?.refresh_token
        ) {
          try {
            const { access_token } = await getNewToken(
              parsedData.refresh_token,
              parsedData
            );

            prevRequestConfig.headers[
              "Authorization"
            ] = `Bearer ${access_token}`;
            return request({
              ...prevRequestConfig,
              headers: prevRequestConfig.headers.toJSON(),
            });
          } catch (error) {
            console.error("Failed to refresh token:", error);
            await logout();
          }
        } else {
          await logout();
        }
        break;
      case 400:
        pushMessage(response?.data);
        break;
      default:
        Toast.show({
          type: "error",
          text1: "Something went wrong",
          visibilityTime: 5000,
        });
        break;
    }
    throw error;
  }
);

export default request;
