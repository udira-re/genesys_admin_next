// services/user.ts or similar (client-side)
import { IUser } from "@/types/userTypes";
import { getApiUrl } from "@/utils/api";
import axios from "axios";

// types/userTypes.ts

export async function getUsersList(token?: string) {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const response = await axios.get(getApiUrl("/api/users"), { headers });

  return response.data.data;
}

export async function getUserDetail(id: string, token: string) {
  const response = await axios.get(getApiUrl(`/api/users/${id}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data as IUser;
}
