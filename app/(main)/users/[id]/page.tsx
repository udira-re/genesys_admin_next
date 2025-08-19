import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UserDetailClient from "@/components/skeleton/userDetailClient";

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = params;

  // cookies() returns a Promise in this context
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value;

  if (!token) {
    redirect("/logout");
  }

  return <UserDetailClient id={id} token={token} />;
}
