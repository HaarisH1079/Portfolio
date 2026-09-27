import { NextResponse } from "next/server";
import { ContactRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

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
  const updated = await ContactRepo.updateMessageStatus(id, body.status);
  if (!updated) {
    return NextResponse.json({ error: "Message not found" }, { status: 404 });
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
  const success = await ContactRepo.deleteMessage(id);
  if (!success) {
    return NextResponse.json({ error: "Failed to delete message" }, { status: 404 });
  }
  return NextResponse.json({ success: true, message: "Message deleted" });
}
