import { NextResponse } from "next/server";
import { getAllLeads, addLead, updateLeadStatus, deleteLead, type Lead, type LeadStatus } from "@/lib/leads-store";

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
    const lead = addLead({ name, phone, email, service, vehicle, message });
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