import { NextResponse } from "next/server";
import { ResumeRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function PATCH(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await props.params;
  const current = await ResumeRepo.setCurrent(id);
  if (!current) {
    return NextResponse.json({ error: "Resume version not found" }, { status: 404 });
  }
  return NextResponse.json({ success: true, current });
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
  const success = await ResumeRepo.delete(id);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete resume version" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Resume version deleted" });
}
