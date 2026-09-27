import { NextResponse } from "next/server";
import { SkillsRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;

  const skills = await SkillsRepo.getAll({ category, search });
  return NextResponse.json(skills);
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.name) {
    return NextResponse.json({ error: "Skill name is required" }, { status: 400 });
  }

  const created = await SkillsRepo.create(body);
  return NextResponse.json(created, { status: 201 });
}
