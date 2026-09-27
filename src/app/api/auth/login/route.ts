import { NextResponse } from "next/server";
import { checkCredentials, createSessionToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, email } = body;

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    const isValid = checkCredentials(password, email);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials. Use 'demo' or 'admin123'." }, { status: 401 });
    }

    const token = createSessionToken({
      id: "admin_haarish",
      email: email || "admin@haarish.dev",
      name: "Haarish Nandakumar",
      role: "admin",
    });

    const response = NextResponse.json({
      success: true,
      user: {
        id: "admin_haarish",
        name: "Haarish Nandakumar",
        email: email || "admin@haarish.dev",
        role: "admin",
      },
    });

    response.cookies.set({
      name: "admin_session",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
