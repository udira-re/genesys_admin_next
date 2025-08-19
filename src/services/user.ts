// services/user.ts or similar (client-side)
import { IUser } from "@/types/userTypes";
import { getApiUrl } from "@/utils/api";
import axios from "axios";

export async function getUserDetail(id: string, token: string) {
  const response = await axios.get(getApiUrl(`/api/users/${id}`), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.data as IUser;
}

export const getUsersList = async (
  token?: string,
  page: number = 1,
  limit: number = 10,
) => {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

  const response = await axios.get(
    getApiUrl(`/api/users?page=${page}&limit=${limit}`),
    { headers },
  );

  return response.data.data;
};
