import { NextResponse } from "next/server";
import { SkillsRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const skill = await SkillsRepo.getById(id);
  if (!skill) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }
  return NextResponse.json(skill);
}

export async function PUT(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;
  const body = await request.json();
  const updated = await SkillsRepo.update(id, body);
  if (!updated) {
    return NextResponse.json({ error: "Skill not found" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;
  const success = await SkillsRepo.delete(id);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Skill deleted" });
}
