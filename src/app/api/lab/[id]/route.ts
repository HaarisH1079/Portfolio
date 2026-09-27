import { NextResponse } from "next/server";
import { LabRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET(
  request: Request,
  props: { params: Promise<{ id: string }> }
) {
  const { id } = await props.params;
  const lab = await LabRepo.getById(id);
  if (!lab) {
    return NextResponse.json({ error: "Lab not found" }, { status: 404 });
  }
  return NextResponse.json(lab);
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
  const updated = await LabRepo.update(id, body);
  if (!updated) {
    return NextResponse.json({ error: "Lab not found" }, { status: 404 });
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
  const success = await LabRepo.delete(id);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete lab" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Lab deleted" });
}
