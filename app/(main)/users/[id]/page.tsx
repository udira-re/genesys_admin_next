"use client";

import UserDetailClient from "@/components/skeleton/userDetailClient";

interface PageParams {
  id: string;
}

interface UserDetailPageProps {
  params: PageParams;
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  return <UserDetailClient id={params.id} />;
}
