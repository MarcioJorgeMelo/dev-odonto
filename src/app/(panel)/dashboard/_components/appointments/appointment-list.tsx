"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function AppointmentList({ times }: { times: string[] }) {
  const searchParams = useSearchParams();
  const date = searchParams.get("date");

  console.log(date);

  return (
    <div>
      <h1>Listagem de horários...</h1>
    </div>
  );
}
