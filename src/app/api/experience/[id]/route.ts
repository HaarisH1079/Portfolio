import { NextResponse } from "next/server";
import { ExperienceRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const experience = await ExperienceRepo.getById(id);
  if (!experience) {
    return NextResponse.json({ error: "Experience not found" }, { status: 404 });
  }
  return NextResponse.json(experience);
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
  const updated = await ExperienceRepo.update(id, body);
  if (!updated) {
    return NextResponse.json({ error: "Experience not found" }, { status: 404 });
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
  const success = await ExperienceRepo.delete(id);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Experience deleted" });
}
