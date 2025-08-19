import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserDetailClient from "@/components/skeleton/userDetailClient";

// Do not explicitly extend PageProps
export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const cookieStore = await cookies(); // await because cookies() may be a Promise
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/logout");
  }

  return <UserDetailClient id={id} token={token} />;
}
