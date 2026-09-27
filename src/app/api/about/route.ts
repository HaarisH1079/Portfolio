import { NextResponse } from "next/server";
import { AboutRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const data = await AboutRepo.get();
  return NextResponse.json(data);
}

export async function PUT(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const updated = await AboutRepo.update(body);
  return NextResponse.json(updated);
}
