"use server";

import { auth } from "@/lib/auth";
import getSession from "@/lib/getSession";
import prisma from "@/lib/prisma";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "O nome é obrigatório" }),
  address: z.string().optional(),
  phone: z.string().optional(),
  status: z.boolean(),
  timeZone: z.string(),
  times: z.array(z.string()),
});

type FormSchema = z.infer<typeof formSchema>;

export async function updateProfile(formData: FormSchema) {
  const session = await getSession();

  if (!session?.user?.id) {
    return {
      error: "Usuário não encontrado.",
    };
  }

  const schema = formSchema.safeParse(formData);

  if (!schema.success) {
    return {
      error: "Preenha todos os campos",
    };
  }

  try {
    await prisma.user.update({
      where: {
        id: session?.user?.id,
      },
      data: {
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        status: formData.status,
        timezone: formData.timeZone,
        times: formData.times || [],
      },
    });

    return {
      data: "Clínica atualizada com sucesso!",
    };
  } catch (error) {
    return {
      error: "Falha ao atualizar um usuário.",
    };
  }
}
