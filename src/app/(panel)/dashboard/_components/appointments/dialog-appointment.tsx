import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AppointmentWithService } from "./appointment-list";
import { format } from "date-fns";
import { formatCurrency } from "@/utils/formatCurrency";

interface DialogAppointmentProps {
  appointment: AppointmentWithService | null;
}

export function DialogAppointment({ appointment }: DialogAppointmentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Detalhes do agendamento</DialogTitle>

        <DialogDescription>
          Veja todos os detalhes do agendamento
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        {appointment && (
          <article>
            <p>
              <span className="font-bold">Horário agendado:</span>{" "}
              {appointment.time}
            </p>
            <p className="mb-2">
              <span className="font-bold">Data do agendamento:</span>{" "}
              {format(appointment.appointmentDate, "dd/MM/yyyy")}
            </p>
            <p>
              <span className="font-bold">Nome:</span> {appointment.name}
            </p>
            <p>
              <span className="font-bold">Telefone:</span> {appointment.phone}
            </p>
            <p>
              <span className="font-bold">Email:</span> {appointment.email}
            </p>

            <section className="bg-gray-200 mt-4 p-2 rounded-md">
              <p>
                <span className="font-bold">Serviço:</span>{" "}
                {appointment.service.name}
              </p>
              <p>
                <span className="font-bold">Valor:</span>{" "}
                {formatCurrency(appointment.service.price / 100)}
              </p>
            </section>
          </article>
        )}
      </div>
    </DialogContent>
  );
}
