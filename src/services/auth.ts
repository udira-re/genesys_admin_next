import { TLoginSchema } from "@/types/authTypes";
import { getApiUrl } from "@/utils/api";
import axios from "axios";

export async function login(data: TLoginSchema) {
  const response = await axios.post(getApiUrl("/api/auth/login"), data, {
    headers: { "x-genesys-platform": "creator" },
  });
  return response.data.data;
}
