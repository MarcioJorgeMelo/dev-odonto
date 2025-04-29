"use server";

import prisma from "@/lib/prisma";

export async function getClinics() {
  try {
    const clinics = await prisma.user.findMany({
      where: {
        status: true,
      },
    });

    return clinics;
  } catch (error) {
    return [];
  }
}
