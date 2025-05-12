import { redirect } from "next/navigation";
import { getPermissionUserToReports } from "./_data-access/get-permission-report";
import { getSession } from "next-auth/react";
import { auth } from "@/lib/auth";

export default async function Reports() {
  const session = await auth();

  if (!session) {
    redirect("/dashboard");
  }

  const user = await getPermissionUserToReports({ userId: session?.user?.id });

  if (!user) {
    return (
      <main>
        <h1>Você não tem permissão para acessar essa página</h1>

        <p>
          Assine o plano PROFISSIONAL para ter acesso completo a essa página
        </p>
      </main>
    );
  }

  return (
    <main>
      <h1>Página de relatórios</h1>
    </main>
  );
}
