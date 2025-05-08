import { canPermission } from "@/utils/permissions/canPermission";
import { getAllServices } from "../_data-access/get-all-services";
import { ServiceList } from "./service-list";
import { LabelSubscription } from "@/components/ui/label-subscription";

interface ServicesContentProps {
  userId: string;
}

export async function ServicesContent({ userId }: ServicesContentProps) {
  const services = await getAllServices({ userId });

  const permission = await canPermission({ type: "service" });

  return (
    <>
      {!permission.hasPermission && (
        <LabelSubscription expired={permission.expired} />
      )}

      <ServiceList services={services.data || []} permission={permission} />
    </>
  );
}
