import { Button } from "@/components/ui/button";
import Image from "next/image";
import doctorImage from "../../../../public/doctor-hero.png";

export function Hero() {
  return (
    <section>
      <div className="container mx-auto px-4 pt-20 pb-4 sm:pb-0 sm:px-6 lg:px-8">
        <main className="flex items-center justify-center">
          <article className="space-y-8 max-w-3xl flex flex-2 flex-col justify-center">
            <h1 className="text-4xl font-bold lg:text-5xl max-w-2xl tracking-tight">
              Encontre os melhores profissionais em um único local!
            </h1>

            <p className="text-base md:text-lg text-gray-600">
              Nós somos uma plataforma para profissionais de saúde com foco em
              agilizar seu atendimento de forma simplificada e organizada.
            </p>

            <Button className="bg-emerald-500 hover:bg-emerald-400 w-fit px-6 font-semibold">
              Encontre uma clínica
            </Button>
          </article>

          <div className="hidden lg:block">
            <Image
              src={doctorImage}
              alt="Foto ilustrativa de um profissional da saúde"
              width={340}
              height={400}
              className="object-contain"
              quality={100}
              priority
            />
          </div>
        </main>
      </div>
    </section>
  );
}
