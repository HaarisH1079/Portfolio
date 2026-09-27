import { NextResponse } from "next/server";
import { ExperienceRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const experiences = await ExperienceRepo.getAll();
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.position || !body.company) {
    return NextResponse.json({ error: "Position and company are required" }, { status: 400 });
  }

  const created = await ExperienceRepo.create(body);
  return NextResponse.json(created, { status: 201 });
}
