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
  const skillTitle = body.name || body.title;
  if (!skillTitle) {
    return NextResponse.json({ error: "Skill name or title is required" }, { status: 400 });
  }
  body.name = skillTitle;
  body.title = skillTitle;

  const created = await SkillsRepo.create(body);
  return NextResponse.json(created, { status: 201 });
}
