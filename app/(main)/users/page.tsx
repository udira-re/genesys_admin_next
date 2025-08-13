"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { getUsersList } from "@/services/user";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { IUser } from "@/types/userTypes";

export default function UsersListPage() {
  const router = useRouter();
  const { token, logout } = useAuthStore((state) => state);
  // const token = useAuthStore((state) => state.token);
  // const logout = useAuthStore((state) => state.logout);

  const queryOptions: UseQueryOptions<IUser[], Error> = {
    queryKey: ["users"],
    queryFn: () => {
      if (!token) throw new Error("No token");
      return getUsersList(token);
    },
    retry: 1,
    enabled: !!token,
    // onError: (err) => {
    //   if (err.message === "Session expired") {
    //     logout();
    //     router.replace("/login");
    //   }
    // },
  };

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery<IUser[], Error>(queryOptions);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">
          Please log in to see the users list.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Users List</h2>

      {isLoading && <p className="text-blue-600">Loading users...</p>}

      {error && !isLoading && (
        <p className="text-red-600 font-medium">
          Failed to load users: {error.message}
        </p>
      )}

      {!isLoading && users.length === 0 && (
        <p className="text-gray-500 italic">No users found.</p>
      )}

      {!isLoading && users.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Role", "Email", "Status", "Actions"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition cursor-pointer"
                  onClick={() => router.push(`/users/${user.id}`)}
                >
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {user.role?.join(", ") || "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user?.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user?.status}
                    </span>
                  </td>
                  {!user.role?.includes("admin") && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`/users/${user.id}`);
                        }}
                        className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition cursor-pointer"
                      >
                        Details
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
