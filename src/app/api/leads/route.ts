import { NextResponse } from "next/server";
import { addLead } from "@/lib/leads-store";

const MAX_NAME = 100;
const MAX_PHONE = 15;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const MAX_VEHICLE = 100;

function sanitizeShort(str: unknown, max: number): string {
  if (typeof str !== "string") return "";
  return str.replace(/[<>"';&]/g, "").trim().slice(0, max);
}

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/[<>]/g, "").trim().slice(0, MAX_MESSAGE);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
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
