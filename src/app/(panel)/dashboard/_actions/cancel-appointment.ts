"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

const formSchema = z.object({
  appointmentId: z.string().min(1, "Você precisa fornecer um agendamento."),
});

type FormSchema = z.infer<typeof formSchema>;

export async function cancelAppointment(formData: FormSchema) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      error: "Falha ao cancelar agendamento.",
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    await prisma.appointment.delete({
      where: {
        id: formData.appointmentId,
        userId: session?.user?.id,
      },
    });

    revalidatePath("/dashboard");

    return {
      data: "Agendamento cancelado com sucesso!",
    };
  } catch (error) {
    return {
      error: "Erro ao cancelar agendamento.",
    };
  }
}
