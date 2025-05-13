"use server";

import prisma from "@/lib/prisma";
import { Subscription } from "@prisma/client";
import { Session } from "next-auth";
import { getPlan } from "./get-plan";
import { PLANS_LIMITS } from "../plans";
import { checkSubscriptionExpired } from "./checkSubscriptionExpired";
import { ResultPermissionProps } from "./canPermission";

export async function canCreateService(
  subscription: Subscription | null,
  session: Session
): Promise<ResultPermissionProps> {
  try {
    const servicesCount = await prisma.service.count({
      where: {
        userId: session?.user?.id,
        status: true,
      },
    });

    if (subscription && subscription.status === "active") {
      const plan = subscription.plan;
      const planLimits = await getPlan(plan);

      return {
        hasPermission:
          planLimits.maxServices === null ||
          servicesCount < planLimits.maxServices,
        planId: subscription.plan,
        expired: false,
        plan: PLANS_LIMITS[subscription.plan],
      };
    }

    const checkUserLimit = await checkSubscriptionExpired(session);

    return checkUserLimit;
  } catch (error) {
    return {
      hasPermission: false,
      planId: "EXPIRED",
      expired: false,
      plan: null,
    };
  }
}
