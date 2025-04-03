"use client";

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DialogServiceFormData,
  UseDialogServiceForm,
} from "./dialog-service-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertRealtoCents } from "@/utils/convertCurrency";
import { createNewService } from "../_actions/create-service";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateService } from "../_actions/update-service";

interface DialogServiceProps {
  closeModal: () => void;
  serviceId?: string;
  initialValues?: {
    name: string;
    price: string;
    hours: string;
    minutes: string;
  };
}

export function DialogService({
  closeModal,
  initialValues,
  serviceId,
}: DialogServiceProps) {
  const form = UseDialogServiceForm({ initialValues: initialValues });

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function onSubmit(formData: DialogServiceFormData) {
    setLoading(true);

    const priceInCents = convertRealtoCents(formData.price);
    const hours = parseInt(formData.hours) || 0;
    const minutes = parseInt(formData.minutes) || 0;

    const duration = hours * 60 + minutes;

    if (serviceId) {
      await editServiceById({
        name: formData.name,
        priceInCents: priceInCents,
        duration: duration,
        serviceId: serviceId,
      });

      setLoading(false);

      return;
    }

    const response = await createNewService({
      name: formData.name,
      price: priceInCents,
      duration: duration,
    });

    setLoading(false);

    if (response.error) {
      toast.error(response.error);
      return;
    }

    toast.success("Serviço cadastrado com sucesso!");
    handleCloseModal();
    router.refresh();
  }

  async function editServiceById({
    serviceId,
    name,
    priceInCents,
    duration,
  }: {
    serviceId: string;
    name: string;
    priceInCents: number;
    duration: number;
  }) {
    const response = await updateService({
      name: name,
      price: priceInCents,
      duration: duration,
      serviceId: serviceId,
    });

    if (response.error) {
      toast.error(response.error);
    }

    toast.success(response.data);
    handleCloseModal();
  }

  function handleCloseModal() {
    form.reset();
    closeModal();
  }

  function changeCurrency(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, "");

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2);
      value = value.replace(".", ",");
      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    event.target.value = value;
    form.setValue("price", value);
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {serviceId ? "Editar serviço" : "Novo serviço"}
        </DialogTitle>

        <DialogDescription>
          {serviceId
            ? "Edite um serviço cadastrado"
            : "Adicione um novo serviço"}
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form
          className="space-y-2 flex flex-col"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="font-semibold">
                  Nome do serviço:
                </FormLabel>

                <FormControl>
                  <Input {...field} placeholder="Digite o nome do serviço..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="my-2">
                <FormLabel className="font-semibold">
                  Valor do serviço:
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    placeholder="Ex: 120,00"
                    onChange={changeCurrency}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="font-semibold">Tempo de duração do serviço:</p>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Horas:</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="1" min="0" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem className="my-2">
                  <FormLabel className="font-semibold">Minutos:</FormLabel>

                  <FormControl>
                    <Input {...field} placeholder="0" min="0" type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full font-semibold text-white"
            disabled={loading}
          >
            {loading
              ? "Carregando..."
              : `${serviceId ? "Atualizar serviço" : "Cadastrar serviço"}`}
          </Button>
        </form>
      </Form>
    </>
  );
}
