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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertRealtoCents } from "@/utils/convertCurrency";

export function DialogService() {
  const form = UseDialogServiceForm();

  async function onSubmit(formData: DialogServiceFormData) {
    const priceInCents = convertRealtoCents(formData.price);
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
        <DialogTitle>Novo serviço</DialogTitle>

        <DialogDescription>Adicione um novo serviço</DialogDescription>
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

          <Button type="submit" className="w-full font-semibold text-white">
            Adicionar serviço
          </Button>
        </form>
      </Form>
    </>
  );
}
