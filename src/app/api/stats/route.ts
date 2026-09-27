import { NextResponse } from "next/server";
import { StatsRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await StatsRepo.getDashboardSummary();
  return NextResponse.json(data);
}
