import { canPermission } from "@/utils/permissions/canPermission";
import { getAllServices } from "../_data-access/get-all-services";
import { ServiceList } from "./service-list";

interface ServicesContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId });

  const permission = await canPermission({ type: "service" });

  return <ServiceList services={services.data || []} permission={permission} />;
}
