import { NextResponse } from "next/server";
import { ContactRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const settings = await ContactRepo.getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const updated = await ContactRepo.updateSettings(body);
  return NextResponse.json(updated);
}
