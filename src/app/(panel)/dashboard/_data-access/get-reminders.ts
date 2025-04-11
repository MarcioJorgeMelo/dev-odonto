"use server";

import prisma from "@/lib/prisma";

export async function getReminders({ userId }: { userId: string }) {
  console.log(userId);

  if (!userId) {
    return [];
  }

  try {
    const reminders = await prisma.reminder.findMany({
      where: {
        userId: userId,
      },
    });

    return reminders;
  } catch (error) {
    return [];
  }
}
