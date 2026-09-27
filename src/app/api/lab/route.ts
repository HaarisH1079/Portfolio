import { NextResponse } from "next/server";
import { LabRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || undefined;
  const status = searchParams.get("status") || undefined;

  const labs = await LabRepo.getAll({ category, status });
  return NextResponse.json(labs);
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  if (!body.slug) {
    body.slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  }

  const created = await LabRepo.create(body);
  return NextResponse.json(created, { status: 201 });
}
