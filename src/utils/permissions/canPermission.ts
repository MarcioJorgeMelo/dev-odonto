"use server";

import { auth } from "@/lib/auth";
import { PlanDetailInfo } from "./get-plan";
import prisma from "@/lib/prisma";
import { canCreateService } from "./canCreateService";

export type PLAN_PROP = "BASIC" | "PROFESSIONAL" | "TRIAL" | "EXPIRED";

type TypeCheck = "service";

export interface ResultPermissionProps {
  hasPermission: boolean;
  planId: PLAN_PROP;
  expired: boolean;
  plan: PlanDetailInfo | null;
}

interface CanPermissionProps {
  type: TypeCheck;
}

export async function canPermission({
  type,
}: CanPermissionProps): Promise<ResultPermissionProps> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: true,
      plan: null,
    };
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  switch (type) {
    case "service":
      const permissions = await canCreateService(subscription, session);

      return permissions;

    default:
      return {
        hasPermission: false,
        planId: "EXPIRED",
        expired: true,
        plan: null,
      };
  }
}
