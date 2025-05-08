import Link from "next/link";

export function LabelSubscription({ expired }: { expired: boolean }) {
  return (
    <div className="bg-red-400 text-white text-sm md:text-base px-3 py-2 my-4 rounded-md flex flex-col md:flex-row md:items-center justify-between gap-1">
      <div>
        {expired ? (
          <h3 className="font-bold">
            Seu plano expirou ou você não possui um plano ativo!
          </h3>
        ) : (
          <h3 className="font-bold">Você excedeu o limite de seu plano!</h3>
        )}

        <p className="text-sm text-gray-50">
          Acesse o seu plano para verificar os detalhes
        </p>
      </div>

      <Link
        href="/dashboard/plans"
        className="bg-zinc-900 text-white px-3 py-1 rounded-md w-fit"
      >
        Acessar planos
      </Link>
    </div>
  );
}
