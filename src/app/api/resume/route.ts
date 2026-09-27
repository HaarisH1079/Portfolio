import { NextResponse } from "next/server";
import { ResumeRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET() {
  const [allResumes, currentResume] = await Promise.all([
    ResumeRepo.getAll(),
    ResumeRepo.getCurrent(),
  ]);

  return NextResponse.json({
    resumes: allResumes,
    current: currentResume,
  });
}

export async function POST(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  if (!body.fileName || !body.fileUrl) {
    return NextResponse.json({ error: "File name and file URL are required" }, { status: 400 });
  }

  const created = await ResumeRepo.create(body);
  return NextResponse.json(created, { status: 201 });
}
