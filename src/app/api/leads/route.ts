import { NextResponse } from "next/server";
import { addLead } from "@/lib/leads-store";
import { scanForAttacks, getAttackResponse } from "@/lib/security";
import { logAudit } from "@/lib/audit-log";

const MAX_NAME = 100;
const MAX_PHONE = 15;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const MAX_VEHICLE = 100;

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

function sanitizeShort(str: unknown, max: number): string {
  if (typeof str !== "string") return "";
  return str.replace(/[<>"';&]/g, "").trim().slice(0, max);
}

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/[<>]/g, "").trim().slice(0, MAX_MESSAGE);
}

export async function POST(request: Request) {
  const ip = getClientIP(request);
  const userAgent = request.headers.get("user-agent") || "";

  try {
    const body = await request.json();

    const { attacked, field } = scanForAttacks(body);
    if (attacked) {
      await logAudit({ action: "injection_attempt", ip, userAgent, field, message: `Injection in field: ${field}` });
      return getAttackResponse(ip, field);
    }

    const { name, phone, email, service, vehicle, message } = body;
    if (!name || !phone || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const cleanName = sanitizeShort(name, MAX_NAME);
    const cleanPhone = sanitizeShort(phone, MAX_PHONE);
    const cleanEmail = sanitizeShort(email, MAX_EMAIL);
    const cleanService = sanitizeShort(service, 50);
    const cleanVehicle = sanitizeShort(vehicle, MAX_VEHICLE);
    const cleanMessage = sanitize(message);
    if (!cleanName || !cleanPhone || !cleanEmail) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(cleanEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    const phoneRe = /^[+]?[\d\s-]{7,15}$/;
    if (!phoneRe.test(cleanPhone)) {
      return NextResponse.json({ error: "Invalid phone" }, { status: 400 });
    }
    const lead = await addLead({
      name: cleanName,
      phone: cleanPhone,
      email: cleanEmail,
      service: cleanService,
      vehicle: cleanVehicle,
      message: cleanMessage,
    });
    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
