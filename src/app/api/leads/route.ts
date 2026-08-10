import { NextResponse } from "next/server";
import { getAllLeads, addLead, updateLeadStatus, deleteLead, type Lead, type LeadStatus } from "@/lib/leads-store";

const MAX_NAME = 100;
const MAX_PHONE = 15;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 2000;
const MAX_VEHICLE = 100;

function sanitize(str: unknown): string {
  if (typeof str !== "string") return "";
  return str.replace(/[<>]/g, "").trim().slice(0, MAX_MESSAGE);
}

function sanitizeShort(str: unknown, max: number): string {
  if (typeof str !== "string") return "";
  return str.replace(/[<>"';&]/g, "").trim().slice(0, max);
}

function parseQuery(url: URL) {
  return {
    status: url.searchParams.get("status") ?? "",
    service: url.searchParams.get("service") ?? "",
    search: url.searchParams.get("search") ?? "",
    dateFrom: url.searchParams.get("dateFrom") ?? "",
    dateTo: url.searchParams.get("dateTo") ?? "",
  };
}

export async function GET(request: Request) {
  const { status, service, search, dateFrom, dateTo } = parseQuery(new URL(request.url));
  let leads = getAllLeads();

  if (status) {
    leads = leads.filter((l) => l.status === status);
  }
  if (service) {
    leads = leads.filter((l) => l.service === service);
  }
  if (search) {
    const q = search.toLowerCase();
    leads = leads.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.phone.includes(q) ||
        l.email.toLowerCase().includes(q)
    );
  }
  if (dateFrom) {
    const from = new Date(dateFrom);
    leads = leads.filter((l) => new Date(l.createdAt) >= from);
  }
  if (dateTo) {
    const to = new Date(dateTo);
    to.setHours(23, 59, 59, 999);
    leads = leads.filter((l) => new Date(l.createdAt) <= to);
  }

  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, service, vehicle, message } = body;
    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
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
    const lead = addLead({ name: cleanName, phone: cleanPhone, email: cleanEmail, service: cleanService, vehicle: cleanVehicle, message: cleanMessage });
    return NextResponse.json(lead, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing id or status" },
        { status: 400 }
      );
    }
    const validStatuses = ["new", "viewed", "contacted", "converted", "lost"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }
    const updated = updateLeadStatus(id, status as unknown as LeadStatus);
    if (!updated) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id } = body;
    if (!id) {
      return NextResponse.json(
        { error: "Missing id" },
        { status: 400 }
      );
    }
    const success = deleteLead(id);
    if (!success) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}