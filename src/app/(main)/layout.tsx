import { redirect } from "next/navigation";

import { getCurrentUser } from "@/services/user.services";
import { Header } from "@/components/layout/header";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return (
    <div className="relative">
      <Header />
      {children}
    </div>
  );
}
