import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserDetailClient from "@/components/skeleton/userDetailClient";

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const token = (await cookies()).get("accessToken")?.value;

  if (!token) {
    redirect("/logout");
  }

  return <UserDetailClient id={id} token={token} />;
}
