"use server";

import { Plan } from "@prisma/client";
import { PLANS_LIMITS, PlansProps } from "@/utils/plans/index";

export interface PlanDetailInfo {
  maxServices: number;
}

export async function getPlan(planId: Plan) {
  return PLANS_LIMITS[planId];
}
