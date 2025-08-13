import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserDetail } from "@/services/user";
import { IUser } from "@/types/userTypes";
import React from "react";

interface PageParams {
  id: string;
}

interface Props {
  params: PageParams;
}

// Make the function async is fine
export default async function UserDetailPage({ params }: Props) {
  const { id } = params;

  const cookieStore = cookies();
  const token = (await cookieStore).get("accessToken")?.value;

  if (!token) {
    redirect("/logout");
  }

  let user: IUser | null = null;

  try {
    user = await getUserDetail(id, token);
  } catch (error) {
    return (
      <div className="text-red-500 p-4 max-w-4xl mx-auto">
        Failed to load user details.
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-red-500 p-4 max-w-4xl mx-auto">User not found.</div>
    );
  }

  const nickname = user.attributes?.nickname?.[0] || "";
  const dateOfBirth = user.attributes?.dateOfBirth?.[0] || "";
  const status = user.attributes?.status?.[0] || "";
  const balance = user.profile?.balance ?? 0;
  const gcoin = user.profile?.gcoin ?? 0;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
        USER DETAILS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="First Name" value={user.firstName} />
        <InputField label="Last Name" value={user.lastName} />
        <InputField label="Email" value={user.email} />
        <InputField label="Nickname" value={nickname} />
        <InputField label="Date of Birth" value={dateOfBirth} />
        <InputField label="Status" value={status} />
        <InputField label="VAT Number" value={user.vatNumber || ""} />
        <InputField label="Fiscal Code" value={user.fiscalCode || ""} />
        <InputField label="Role" value={user.role?.join(", ") || ""} />
        <InputField label="Balance" value={`$ ${balance}`} />
        <InputField label="GCOIN" value={`${gcoin}`} />
      </div>
    </div>
  );
}

// Reusable read-only input field component
const InputField = ({ label, value }: { label: string; value: string }) => (
  <label className="flex flex-col">
    <span className="text-sm text-gray-600 mb-1">{label}</span>
    <input
      type="text"
      value={value}
      readOnly
      className="bg-gray-100 border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-800"
    />
  </label>
);
