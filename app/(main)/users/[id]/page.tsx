import UserDetailClient from "@/components/skeleton/userDetailClient";

// Server Component
export default function UserDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  return <UserDetailClient id={id} />;
}
