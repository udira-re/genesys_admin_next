import UserDetailClient from "@/components/skeleton/userDetailClient";

interface UserDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const { id } = await params; // await the Promise
  return <UserDetailClient id={id} />;
}
