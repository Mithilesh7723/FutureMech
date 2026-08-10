import { NextResponse } from "next/server";
import { logAudit, type AuditAction } from "@/lib/audit-log";

function getClientIP(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, email, field, message } = body;
    const ip = getClientIP(request);
    const userAgent = request.headers.get("user-agent") || "";

    const validActions: AuditAction[] = [
      "login_success",
      "login_failed",
      "google_login_success",
      "google_login_blocked",
      "injection_attempt",
      "rate_limit",
    ];
    if (!validActions.includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    await logAudit({ action, email, ip, userAgent, field, message });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
