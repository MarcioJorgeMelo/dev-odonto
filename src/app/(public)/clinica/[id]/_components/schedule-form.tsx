"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const scheduleSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().min(1, "O email é obrigatório."),
  phone: z.string().min(1, "O telefone é obrigatório."),
  date: z.date(),
  serviceId: z.string().min(1, "O serviço é obrigatório."),
});

export type ScheduleFormData = z.infer<typeof scheduleSchema>;

export function useScheduleForm() {
  return useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      serviceId: "",
      date: new Date(),
    },
  });
}
