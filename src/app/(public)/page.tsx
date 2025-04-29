import { Clinics } from "./_components/clinics";
import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import { getClinics } from "./_data-access/get-clinics";

export const revalidate = 120;

export default async function Home() {
  const clinics = await getClinics();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <div>
        <Hero />

        <Clinics clinics={clinics || []} />

        <Footer />
      </div>
    </div>
  );
}
