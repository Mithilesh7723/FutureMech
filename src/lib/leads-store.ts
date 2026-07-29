import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");
const FILE = path.join(DATA_DIR, "leads.json");

export type LeadStatus = "new" | "viewed" | "contacted" | "converted" | "lost";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  vehicle: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

function ensureFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, "[]", "utf-8");
}

export function getAllLeads(): Lead[] {
  ensureFile();
  try {
    const raw = fs.readFileSync(FILE, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export function getLeadById(id: string): Lead | null {
  return getAllLeads().find((l) => l.id === id) ?? null;
}

export function addLead(
  data: Omit<Lead, "id" | "createdAt" | "updatedAt" | "status">
): Lead {
  ensureFile();
  const lead: Lead = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 9),
    ...data,
    status: "new",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const leads = getAllLeads();
  leads.unshift(lead);
  fs.writeFileSync(FILE, JSON.stringify(leads, null, 2), "utf-8");
  return lead;
}

export function updateLeadStatus(
  id: string,
  status: LeadStatus
): Lead | null {
  ensureFile();
  const leads = getAllLeads();
  const idx = leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  leads[idx] = { ...leads[idx], status, updatedAt: new Date().toISOString() };
  fs.writeFileSync(FILE, JSON.stringify(leads, null, 2), "utf-8");
  return leads[idx];
}

export function deleteLead(id: string): boolean {
  ensureFile();
  const leads = getAllLeads();
  const filtered = leads.filter((l) => l.id !== id);
  if (filtered.length === leads.length) return false;
  fs.writeFileSync(FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}