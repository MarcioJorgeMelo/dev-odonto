"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reminder } from "@prisma/client";
import { Plus, Trash } from "lucide-react";
import { deleteReminder } from "../../_actions/delete-reminder";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReminderListProps {
  reminders: Reminder[];
}

export function ReminderList({ reminders }: ReminderListProps) {
  const router = useRouter();

  async function handleDeleteReminder(id: string) {
    const response = await deleteReminder({ reminderId: id });

    if (response.error) {
      toast.error(response.error);
    }

    toast.success(response.data);
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            Lembretes
          </CardTitle>

          <Button variant="ghost" className="w-9 p-0">
            <Plus className="w-5 h-5" />
          </Button>
        </CardHeader>

        <CardContent>
          {reminders.length === 0 && (
            <p className="text-sm text-gray-500">
              Nenhum lembrete registrado...
            </p>
          )}

          <ScrollArea className="h-[340px] lg:max-h-[calc(100vh-15rem)] pr-0 w-full flex-1">
            {reminders.map((item) => (
              <article
                className="flex flex-wrap flex-row items-center justify-between py-2 bg-yellow-100 mb-2 px-2 rounded-md"
                key={item.id}
              >
                <p className="text-sm lg:text-base">{item.description}</p>

                <Button
                  className="bg-red-500 hover:bg-red-400 shadow-none rounded-full p2"
                  size="sm"
                  onClick={() => handleDeleteReminder(item.id)}
                >
                  <Trash className="w-4 h-4 text-white" />
                </Button>
              </article>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
