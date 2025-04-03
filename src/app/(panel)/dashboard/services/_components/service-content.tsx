import { getAllServices } from "../_data-access/get-all-services";
import { ServiceList } from "./service-list";

interface ServicesContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId });

  return <ServiceList services={services.data || []} />;
}
