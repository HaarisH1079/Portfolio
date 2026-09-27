import { NextResponse } from "next/server";
import { ContactRepo } from "@/lib/repository";
import { getAuthUser } from "@/lib/auth";

export async function GET(request: Request) {
  const user = await getAuthUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;
  const messages = await ContactRepo.getMessages({ status });
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    const created = await ContactRepo.createMessage({
      name,
      email,
      subject: subject || "Portfolio Inbound Inquiry",
      message,
    });

    return NextResponse.json({ success: true, message: created }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit message" }, { status: 500 });
  }
}
