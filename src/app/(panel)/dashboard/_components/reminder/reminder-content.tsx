"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReminderFormData, useReminderForm } from "./reminder-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function ReminderContent() {
  const form = useReminderForm();

  async function onSubmit(formData: ReminderFormData) {}

  return (
    <div className="grid gap-4 py-4">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">
                  Descreva o lembrete:
                </FormLabel>

                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Digite a descrição do lembrete..."
                    className="max-h-52 resize-none"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={!form.watch("description")}>
            Cadastrar lembrete
          </Button>
        </form>
      </Form>
    </div>
  );
}
