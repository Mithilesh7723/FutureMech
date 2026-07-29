"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { Search, Filter, X, Check, Phone, Mail, Car, MessageSquare, Clock, Eye, PhoneCall, CheckCircle, XCircle, Trash2, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

type LeadStatus = "new" | "viewed" | "contacted" | "converted" | "lost";

interface Lead {
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

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  viewed: "Viewed",
  contacted: "Contacted",
  converted: "Converted",
  lost: "Lost",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-amber-light text-amber-muted",
  viewed: "bg-sage-light text-sage",
  contacted: "bg-bronze-light text-bronze",
  converted: "bg-ink text-white-pure",
  lost: "bg-stone/10 text-stone",
};

const SERVICE_LABELS: Record<string, string> = {
  "battery-health-check": "Battery Health Check",
  "battery-regeneration": "Battery Regeneration",
  "battery-diagnostics": "Battery Diagnostics",
  "car-service": "Car Service",
  "doorstep-service": "Doorstep Service",
  "fleet-maintenance": "Fleet Maintenance",
  "pdi": "Pre-Delivery Inspection",
  "other": "Other",
};

const AUTH_USER = "admin";
const AUTH_PASS = "admin";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateShort(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

async function apiFetch<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [serviceFilter, setServiceFilter] = useState<string>("");
  const [viewingLead, setViewingLead] = useState<Lead | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const login = useCallback(() => {
    if (password === AUTH_PASS) {
      setAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect password");
    }
  }, [password]);

  useEffect(() => {
    if (!authenticated) return;
    let ignore = false;
    setLoading(true);
    apiFetch<Lead[]>("/api/leads")
      .then((data) => { if (!ignore) { setLeads(data); setLoading(false); } })
      .catch(() => { if (!ignore) setLoading(false); });
    return () => { ignore = true; };
  }, [authenticated]);

  const filtered = useMemo(() => {
    let result = leads;
    if (statusFilter) result = result.filter((l) => l.status === statusFilter);
    if (serviceFilter) result = result.filter((l) => l.service === serviceFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.phone.includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (SERVICE_LABELS[l.service] || "").toLowerCase().includes(q)
      );
    }
    return result;
  }, [leads, search, statusFilter, serviceFilter]);

  const stats = useMemo(() => {
    const counts: Record<LeadStatus, number> = { new: 0, viewed: 0, contacted: 0, converted: 0, lost: 0 };
    leads.forEach((l) => { counts[l.status]++; });
    return counts;
  }, [leads]);

  const updateStatus = useCallback(async (id: string, status: LeadStatus) => {
    try {
      const updated = await apiFetch<Lead>("/api/leads", {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
      });
      setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
      showToast(`Updated to ${STATUS_LABELS[status]}`, "success");
    } catch {
      showToast("Failed to update", "error");
    }
  }, []);

  const removeLead = useCallback(async (id: string) => {
    try {
      await apiFetch("/api/leads", {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      setLeads((prev) => prev.filter((l) => l.id !== id));
      setViewingLead(null);
      showToast("Lead removed", "success");
    } catch {
      showToast("Failed to remove", "error");
    }
  }, []);

  const showToast = useCallback((msg: string, type: "success" | "error") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const services = useMemo(() => {
    const s = new Set(leads.map((l) => l.service));
    return Array.from(s).sort();
  }, [leads]);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-full max-w-md px-6">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-ink">FutureMech</h1>
            <p className="mt-2 text-[0.8125rem] text-stone">Admin Panel — Lead Management</p>
          </div>
          <div className="rounded-2xl border border-parchment bg-white-pure p-8 shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
            <label htmlFor="admin-password" className="mb-2 block text-[0.75rem] font-semibold uppercase tracking-wider text-graphite">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setAuthError(""); }}
              onKeyDown={(e) => { if (e.key === "Enter") login(); }}
              placeholder="Enter admin password"
              className="w-full rounded-xl border border-parchment bg-white-pure px-4 py-3 text-[0.875rem] text-ink placeholder:text-sand focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10"
            />
            {authError && (
              <p className="mt-2 text-[0.75rem] text-terracotta">{authError}</p>
            )}
            <button
              onClick={login}
              className="mt-5 w-full rounded-xl bg-ink px-4 py-3 text-[0.875rem] font-semibold text-white-pure transition-all duration-200 hover:bg-graphite"
            >
              Sign In
            </button>
            <p className="mt-3 text-center text-[0.6875rem] text-sand/50">
              Hint: admin / admin
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-ivory">
        <div className="border-b border-parchment bg-white-pure/80 backdrop-blur-sm sticky top-[72px] z-40">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-[5vw] py-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-ink flex items-center justify-center">
                <Car size={16} className="text-bronze" />
              </div>
              <div>
                <h1 className="text-[0.9375rem] font-semibold text-ink">Lead Manager</h1>
                <p className="text-[0.625rem] text-sand">FutureMech Admin</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[0.75rem] font-medium text-graphite transition-colors hover:text-ink border border-parchment hover:border-sand/30"
              >
                ← Back to Site
              </Link>
              <button
                onClick={() => { setAuthenticated(false); setPassword(""); setLeads([]); }}
                className="rounded-lg px-3 py-1.5 text-[0.75rem] font-medium text-sand transition-colors hover:text-graphite border border-parchment hover:border-sand/30"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-[5vw] py-8">
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { label: "Total", count: leads.length, color: "bg-ink text-white-pure" },
              { label: "New", count: stats.new, color: "bg-amber-light text-amber-muted border border-amber-muted/20" },
              { label: "Viewed", count: stats.viewed, color: "bg-sage-light text-sage border border-sage/20" },
              { label: "Contacted", count: stats.contacted, color: "bg-bronze-light text-bronze border border-bronze/20" },
              { label: "Converted", count: stats.converted, color: "bg-ink text-white-pure border border-ink/20" },
            ].map((s) => (
              <div key={s.label} className={`rounded-xl p-4 ${s.color} shadow-sm`}>
                <p className="text-[0.625rem] font-semibold uppercase tracking-wider opacity-60">{s.label}</p>
                <p className="mt-1 text-[1.5rem] font-serif font-bold">{s.count}</p>
              </div>
            ))}
          </div>

          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sand" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, phone, email..."
                className="w-full rounded-xl border border-parchment bg-white-pure py-2.5 pl-10 pr-4 text-[0.8125rem] text-ink placeholder:text-sand focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-sand hover:text-ink">
                  <X size={14} />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-parchment bg-white-pure px-3 py-2.5 text-[0.8125rem] text-ink focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10 appearance-none cursor-pointer"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="viewed">Viewed</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted</option>
                <option value="lost">Lost</option>
              </select>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="rounded-xl border border-parchment bg-white-pure px-3 py-2.5 text-[0.8125rem] text-ink focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10 appearance-none cursor-pointer"
              >
                <option value="">All Services</option>
                {services.map((s) => (
                  <option key={s} value={s}>{SERVICE_LABELS[s] || s}</option>
                ))}
              </select>
              {(statusFilter || serviceFilter || search) && (
                <button
                  onClick={() => { setSearch(""); setStatusFilter(""); setServiceFilter(""); }}
                  className="rounded-lg px-3 py-2.5 text-[0.75rem] font-medium text-sand hover:text-ink transition-colors border border-parchment hover:border-sand/30"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <RefreshCw size={24} className="animate-spin text-bronze" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="rounded-2xl border border-parchment bg-white-pure p-12 text-center">
              <p className="text-[0.875rem] text-sand/60">No leads found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((lead) => (
                <div
                  key={lead.id}
                  className="group rounded-2xl border border-parchment bg-white-pure p-5 transition-all duration-200 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-[0.9375rem] font-semibold text-ink">{lead.name}</h3>
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-wider ${STATUS_COLORS[lead.status]}`}>
                          {STATUS_LABELS[lead.status]}
                        </span>
                        <span className="inline-flex items-center rounded-full bg-parchment px-2 py-0.5 text-[0.625rem] font-medium text-graphite">
                          {SERVICE_LABELS[lead.service] || lead.service || "N/A"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-[0.75rem] text-sand/60">
                        <span className="flex items-center gap-1.5"><Phone size={12} /> {lead.phone}</span>
                        <span className="flex items-center gap-1.5"><Mail size={12} /> {lead.email}</span>
                        {lead.vehicle && <span className="flex items-center gap-1.5"><Car size={12} /> {lead.vehicle}</span>}
                      </div>
                      <p className="mt-2 text-[0.75rem] text-sand/40 flex items-start gap-1.5">
                        <Clock size={12} className="mt-0.5 shrink-0" />
                        {formatDate(lead.createdAt)}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setViewingLead(lead)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-ink/5 px-3 py-1.5 text-[0.75rem] font-medium text-ink transition-colors hover:bg-ink/10"
                      >
                        <Eye size={12} /> View
                      </button>
                      <StatusActionBtn lead={lead} currentStatus="new" targetStatus="viewed" icon={<Eye size={12} />} label="View" onUpdate={updateStatus} />
                      <StatusActionBtn lead={lead} currentStatus="new" targetStatus="contacted" icon={<PhoneCall size={12} />} label="Contact" onUpdate={updateStatus} />
                      <StatusActionBtn lead={lead} currentStatus="viewed" targetStatus="contacted" icon={<PhoneCall size={12} />} label="Contact" onUpdate={updateStatus} />
                      <StatusActionBtn lead={lead} currentStatus="contacted" targetStatus="converted" icon={<CheckCircle size={12} />} label="Won" onUpdate={updateStatus} />
                      <StatusActionBtn lead={lead} currentStatus="new" targetStatus="lost" icon={<XCircle size={12} />} label="Lost" onUpdate={updateStatus} />
                      <StatusActionBtn lead={lead} currentStatus="viewed" targetStatus="lost" icon={<XCircle size={12} />} label="Lost" onUpdate={updateStatus} />
                      <StatusActionBtn lead={lead} currentStatus="contacted" targetStatus="lost" icon={<XCircle size={12} />} label="Lost" onUpdate={updateStatus} />
                      <button
                        onClick={() => removeLead(lead.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-terracotta/10 px-3 py-1.5 text-[0.75rem] font-medium text-terracotta transition-colors hover:bg-terracotta/20"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filtered.length > 0 && (
            <p className="mt-4 text-center text-[0.6875rem] text-sand/40">
              Showing {filtered.length} of {leads.length} leads
            </p>
          )}
        </section>
      </main>
      <Footer />

      {viewingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm p-4" onClick={() => setViewingLead(null)}>
          <div className="w-full max-w-lg rounded-2xl bg-white-pure p-6 shadow-[0_24px_64px_rgba(0,0,0,0.15)]" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <div>
                <h2 className="font-serif text-xl text-ink">{viewingLead.name}</h2>
                <p className="mt-1 text-[0.75rem] text-sand">{formatDate(viewingLead.createdAt)}</p>
              </div>
              <button onClick={() => setViewingLead(null)} className="rounded-lg p-1 hover:bg-parchment transition-colors">
                <X size={18} className="text-sand" />
              </button>
            </div>
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-wider mb-4 ${STATUS_COLORS[viewingLead.status]}`}>
              {STATUS_LABELS[viewingLead.status]}
            </span>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[0.8125rem]">
                <Phone size={14} className="text-bronze shrink-0" />
                <span className="text-graphite">{viewingLead.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-[0.8125rem]">
                <Mail size={14} className="text-bronze shrink-0" />
                <span className="text-graphite">{viewingLead.email}</span>
              </div>
              {viewingLead.vehicle && (
                <div className="flex items-center gap-3 text-[0.8125rem]">
                  <Car size={14} className="text-bronze shrink-0" />
                  <span className="text-graphite">{viewingLead.vehicle}</span>
                </div>
              )}
              <div className="flex items-start gap-3 text-[0.8125rem]">
                <MessageSquare size={14} className="text-bronze shrink-0 mt-0.5" />
                <span className="text-graphite/80">{viewingLead.message || "No message provided"}</span>
              </div>
              <div className="mt-2 rounded-xl bg-section-ivory p-3">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-wider text-bronze mb-1">Service</p>
                <p className="text-[0.8125rem] text-ink">{SERVICE_LABELS[viewingLead.service] || viewingLead.service || "N/A"}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              <StatusActionBtn lead={viewingLead} currentStatus="new" targetStatus="viewed" icon={<Eye size={12} />} label="Mark Viewed" onUpdate={updateStatus} />
              <StatusActionBtn lead={viewingLead} currentStatus="new" targetStatus="contacted" icon={<PhoneCall size={12} />} label="Mark Contacted" onUpdate={updateStatus} />
              <StatusActionBtn lead={viewingLead} currentStatus="viewed" targetStatus="contacted" icon={<PhoneCall size={12} />} label="Mark Contacted" onUpdate={updateStatus} />
              <StatusActionBtn lead={viewingLead} currentStatus="contacted" targetStatus="converted" icon={<CheckCircle size={12} />} label="Mark Converted" onUpdate={updateStatus} />
              <StatusActionBtn lead={viewingLead} currentStatus="new" targetStatus="lost" icon={<XCircle size={12} />} label="Mark Lost" onUpdate={updateStatus} />
              <StatusActionBtn lead={viewingLead} currentStatus="viewed" targetStatus="lost" icon={<XCircle size={12} />} label="Mark Lost" onUpdate={updateStatus} />
              <StatusActionBtn lead={viewingLead} currentStatus="contacted" targetStatus="lost" icon={<XCircle size={12} />} label="Mark Lost" onUpdate={updateStatus} />
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-ink px-5 py-3 text-[0.8125rem] font-medium text-white-pure shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
          {toast.msg}
        </div>
      )}
    </>
  );
}

function StatusActionBtn({
  lead,
  currentStatus,
  targetStatus,
  icon,
  label,
  onUpdate,
}: {
  lead: Lead;
  currentStatus: LeadStatus;
  targetStatus: LeadStatus;
  icon: React.ReactNode;
  label: string;
  onUpdate: (id: string, status: LeadStatus) => void;
}) {
  if (lead.status !== currentStatus) return null;
  return (
    <button
      onClick={() => onUpdate(lead.id, targetStatus)}
      className="inline-flex items-center gap-1.5 rounded-lg border border-parchment bg-white-pure px-3 py-1.5 text-[0.75rem] font-medium text-graphite transition-colors hover:border-bronze/30 hover:text-ink"
    >
      {icon} {label}
    </button>
  );
}