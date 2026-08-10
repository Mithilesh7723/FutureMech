import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type AuditAction =
  | "login_success"
  | "login_failed"
  | "google_login_success"
  | "google_login_blocked"
  | "injection_attempt"
  | "rate_limit";

export interface AuditEntry {
  id: string;
  action: AuditAction;
  email?: string;
  ip: string;
  userAgent?: string;
  field?: string;
  message?: string;
  timestamp: string;
}

const AUDIT_LOG = "audit_log";

export async function logAudit(entry: Omit<AuditEntry, "id" | "timestamp">): Promise<void> {
  await addDoc(collection(db, AUDIT_LOG), {
    ...entry,
    timestamp: new Date().toISOString(),
  });
}

export async function fetchAuditLogs(max = 200): Promise<AuditEntry[]> {
  const snap = await getDocs(
    query(collection(db, AUDIT_LOG), orderBy("timestamp", "desc"), limit(max))
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as AuditEntry));
}
