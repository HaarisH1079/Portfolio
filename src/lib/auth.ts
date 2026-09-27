import { cookies } from "next/headers";
import crypto from "crypto";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "haarish-admin-cms-secret-key-2026";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@haarish.dev";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "admin";
}

// Generate an HMAC-signed session token
export function createSessionToken(user: SessionUser): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payloadData = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // 7 days
    iat: Math.floor(Date.now() / 1000),
  };
  const payload = Buffer.from(JSON.stringify(payloadData)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

// Verify an HMAC-signed session token
export function verifySessionToken(token: string): SessionUser | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [header, payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest("base64url");

    if (signature !== expectedSignature) {
      return null;
    }

    const payloadObj = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (payloadObj.exp && payloadObj.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return {
      id: payloadObj.id || "admin_1",
      email: payloadObj.email || ADMIN_EMAIL,
      name: payloadObj.name || "Haarish Nandakumar",
      role: "admin",
    };
  } catch {
    return null;
  }
}

export function checkCredentials(password: string, email?: string): boolean {
  // Allow login with default passcodes or matching email
  if (password === ADMIN_PASSWORD || password === "demo" || password === "admin123" || password === "haarish") {
    if (!email || email === ADMIN_EMAIL || email.includes("haarish") || email === "admin" || email === "demo@haarish.dev") {
      return true;
    }
  }
  return false;
}

export async function getAuthUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireAuth(): Promise<SessionUser> {
  const user = await getAuthUser();
  if (!user) {
    throw new Error("Unauthorized");
  }
  return user;
}
