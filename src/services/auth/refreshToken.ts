import { config } from "@/src/config/constants";
import axios from "axios";

export async function refreshToken(refreshToken: string): Promise<any> {
  const ENDPOINT = "/auth";
  const url = `${config.publicUrl}${ENDPOINT}/refresh`;
  return axios
    .post(
      url,
      { refresh_token: refreshToken },
      {
        headers: { "X-RefreshToken": true },
      }
    )
    .then((res: any) => {
      return res?.data;
    });
}
