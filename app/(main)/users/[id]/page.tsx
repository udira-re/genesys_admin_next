import React from "react";
import UserDetailClient from "@/components/skeleton/userDetailClient";

// Next.js App Router expects params as Record<string, string>
type PageProps = {
  params: Record<string, string>;
};

const UserDetailPage: React.FC<PageProps> = ({ params }) => {
  const { id } = params;

  return <UserDetailClient id={id} />;
};

export default UserDetailPage;
