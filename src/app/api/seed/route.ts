import { NextResponse } from "next/server";
import { seedMongoDatabase } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function POST() {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const result = await seedMongoDatabase();
  return NextResponse.json(result);
}
