import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { getUserData } from "./_data-access/get-info-user";

export default async function Profile() {
  const session = await getSession();

  if (!session) {
    redirect("/");
  }

  const user = await getUserData({ userId: session?.user?.id });

  if (!user) {
    redirect("/");
  }

  return (
    <div>
      <h1>Página profile</h1>
    </div>
  );
}
