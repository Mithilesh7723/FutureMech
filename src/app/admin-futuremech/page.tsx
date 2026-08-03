"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Phone, Mail, Car, MessageSquare, Clock, Eye, PhoneCall, CheckCircle, XCircle, Trash2, RefreshCw } from "lucide-react";

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
  new: "bg-amber-100 text-amber-800",
  viewed: "bg-blue-50 text-blue-700",
  contacted: "bg-emerald-50 text-emerald-700",
  converted: "bg-graphite/10 text-graphite",
  lost: "bg-stone-100 text-stone-500",
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

const AUTH_PASS = "admin";

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizeLead(raw: Record<string, unknown>): Lead {
  return {
    id: raw.id as string,
    name: raw.name as string,
    phone: raw.phone as string,
    email: raw.email as string,
    service: (raw.service as string) || "",
    vehicle: (raw.vehicle as string) || "",
    message: (raw.message as string) || "",
    status: (raw.status as LeadStatus) || "new",
    createdAt: raw.createdAt as string,
    updatedAt: (raw.updatedAt as string) || (raw.createdAt as string),
  };
}

async function api<T>(url: string, opts?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json", ...opts?.headers },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fService, setFService] = useState("");
  const [open, setOpen] = useState<Lead | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<LeadStatus | "">("");

  const flash = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  }, []);

  const login = useCallback(() => {
    if (pw === AUTH_PASS) { setAuth(true); setPwErr(""); }
    else setPwErr("Wrong password");
  }, [pw]);

  useEffect(() => {
    if (!auth) return;
    setLoading(true);
    api<Record<string, unknown>[]>("/api/leads")
      .then((d) => { setLeads(d.map(normalizeLead)); setLoading(false); })
      .catch(() => setLoading(false));
  }, [auth]);

  const filtered = useMemo(() => {
    let r = leads;
    if (fStatus) r = r.filter((l) => l.status === fStatus);
    if (fService) r = r.filter((l) => l.service === fService);
    if (q.trim()) {
      const s = q.toLowerCase();
      r = r.filter((l) => l.name.toLowerCase().includes(s) || l.phone.includes(s) || l.email.toLowerCase().includes(s));
    }
    return r;
  }, [leads, q, fStatus, fService]);

  const stats = useMemo(() => {
    const c: Record<LeadStatus, number> = { new: 0, viewed: 0, contacted: 0, converted: 0, lost: 0 };
    leads.forEach((l) => c[l.status]++);
    return c;
  }, [leads]);

  const setStatus = useCallback(async (id: string, status: LeadStatus) => {
    try {
      const raw = await api<Record<string, unknown>>("/api/leads", { method: "PATCH", body: JSON.stringify({ id, status }) });
      const u = normalizeLead(raw);
      setLeads((p) => p.map((l) => (l.id === id ? u : l)));
      if (open?.id === id) setOpen(u);
      flash(`Marked as ${STATUS_LABELS[status]}`);
    } catch { flash("Failed to update"); }
  }, [open, flash]);

  const del = useCallback(async (id: string) => {
    try {
      await api("/api/leads", { method: "DELETE", body: JSON.stringify({ id }) });
      setLeads((p) => p.filter((l) => l.id !== id));
      setOpen(null);
      flash("Lead deleted");
    } catch { flash("Failed to delete"); }
  }, [flash]);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allSelected = filtered.length > 0 && filtered.every((l) => selected.has(l.id));

  const toggleSelectAll = useCallback(() => {
    if (allSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((l) => l.id)));
    }
  }, [allSelected, filtered]);

  const bulkUpdateStatus = useCallback(async () => {
    if (!bulkStatus || selected.size === 0) return;
    const ids = Array.from(selected);
    flash(`Updating ${ids.length} leads...`);
    let ok = 0;
    for (const id of ids) {
      try {
        const raw = await api<Record<string, unknown>>("/api/leads", { method: "PATCH", body: JSON.stringify({ id, status: bulkStatus }) });
        const u = normalizeLead(raw);
        setLeads((p) => p.map((l) => (l.id === id ? u : l)));
        ok++;
      } catch {}
    }
    setSelected(new Set());
    setBulkStatus("");
    flash(`Updated ${ok} lead${ok !== 1 ? "s" : ""} to ${STATUS_LABELS[bulkStatus]}`);
  }, [bulkStatus, selected, flash]);

  const bulkDelete = useCallback(async () => {
    if (selected.size === 0) return;
    const ids = Array.from(selected);
    flash(`Deleting ${ids.length} leads...`);
    let ok = 0;
    for (const id of ids) {
      try {
        await api("/api/leads", { method: "DELETE", body: JSON.stringify({ id }) });
        ok++;
      } catch {}
    }
    setLeads((p) => p.filter((l) => !selected.has(l.id)));
    setSelected(new Set());
    flash(`Deleted ${ok} lead${ok !== 1 ? "s" : ""}`);
  }, [selected, flash]);

  const services = useMemo(() => [...new Set(leads.map((l) => l.service))].sort(), [leads]);

  if (!auth) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="w-full max-w-sm px-6">
          <div className="text-center mb-8">
            <Image src="/FutureMEch Logo.png" alt="FutureMech" width={160} height={40} className="mx-auto h-10 w-auto" />
            <p className="mt-3 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-stone">Admin Panel</p>
          </div>
          <div className="rounded-2xl border border-parchment bg-white-pure p-6 shadow-sm">
            <label className="mb-2 block text-[0.6875rem] font-semibold uppercase tracking-wider text-graphite">Password</label>
            <input
              type="password"
              value={pw}
              onChange={(e) => { setPw(e.target.value); setPwErr(""); }}
              onKeyDown={(e) => e.key === "Enter" && login()}
              placeholder="Enter password"
              className="w-full rounded-xl border border-parchment bg-white-pure px-4 py-3 text-[0.875rem] text-ink placeholder:text-sand focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10 transition-all"
            />
            {pwErr && <p className="mt-2 text-[0.75rem] text-red-600">{pwErr}</p>}
            <button onClick={login} className="mt-4 w-full rounded-xl bg-ink py-3 text-[0.875rem] font-semibold text-white-pure transition-all duration-200 hover:bg-graphite active:scale-[0.98]">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Top bar */}
        <div className="shrink-0 border-b border-parchment bg-white-pure">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-[5vw] h-14">
            <div className="flex items-center gap-3">
              <Image src="/FutureMEch Logo.png" alt="FutureMech" width={120} height={30} className="h-6 w-auto" />
              <span className="text-[0.6875rem] font-medium text-stone">Lead Manager</span>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/" className="rounded-lg border border-parchment bg-white-pure px-3 py-1.5 text-[0.6875rem] font-medium text-graphite transition-all duration-200 hover:bg-graphite/5 hover:border-sand/40">&larr; Site</Link>
              <button onClick={() => { setAuth(false); setPw(""); setLeads([]); }} className="rounded-lg border border-parchment px-3 py-1.5 text-[0.6875rem] font-medium text-stone transition-all duration-200 hover:bg-graphite/5 hover:border-sand/40">Sign Out</button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="shrink-0 mx-auto max-w-7xl w-full px-[5vw] pt-5 pb-4">
          <div className="grid grid-cols-5 gap-3">
            {([
              { l: "Total", n: leads.length, bg: "bg-parchment/40", ring: "border-sand/30", tc: "text-ink" },
              { l: "New", n: stats.new, bg: "bg-amber-50", ring: "border-amber-200", tc: "text-amber-700" },
              { l: "Viewed", n: stats.viewed, bg: "bg-blue-50", ring: "border-blue-200", tc: "text-blue-700" },
              { l: "Contacted", n: stats.contacted, bg: "bg-emerald-50", ring: "border-emerald-200", tc: "text-emerald-700" },
              { l: "Converted", n: stats.converted, bg: "bg-parchment/40", ring: "border-sand/30", tc: "text-ink" },
            ] as const).map((s) => (
              <div key={s.l} className={`rounded-xl border ${s.ring} ${s.bg} px-3 py-3 transition-all duration-200`}>
                <p className={`text-[0.5625rem] font-bold uppercase tracking-widest ${s.tc} opacity-50`}>{s.l}</p>
                <p className={`text-[1.375rem] font-serif font-bold leading-tight ${s.tc}`}>{s.n}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Search + Filters */}
        <div className="shrink-0 mx-auto max-w-7xl w-full px-[5vw] pb-3">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone/40" />
              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search leads..."
                className="w-full rounded-xl border border-parchment bg-white-pure py-2.5 pl-9 pr-4 text-[0.8125rem] text-ink placeholder:text-stone/40 focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/10 transition-all"
              />
              {q && <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone hover:text-ink transition-colors"><X size={13} /></button>}
            </div>
            <div className="flex gap-2">
              <Dropdown
                value={fStatus}
                onChange={setFStatus}
                placeholder="All Status"
                options={[
                  { value: "new", label: "New" },
                  { value: "viewed", label: "Viewed" },
                  { value: "contacted", label: "Contacted" },
                  { value: "converted", label: "Converted" },
                  { value: "lost", label: "Lost" },
                ]}
              />
              <Dropdown
                value={fService}
                onChange={setFService}
                placeholder="All Services"
                options={services.map((s) => ({ value: s, label: SERVICE_LABELS[s] || s }))}
              />
              {(fStatus || fService || q) && (
                <button onClick={() => { setQ(""); setFStatus(""); setFService(""); setSelected(new Set()); }} className="rounded-xl border border-parchment px-3 py-2.5 text-[0.75rem] font-medium text-stone hover:text-ink transition-all">Clear</button>
              )}
            </div>
          </div>
        </div>

        {/* Leads list */}
        <div className="flex-1 min-h-0 mx-auto max-w-7xl w-full px-[5vw] pb-4">
          {loading ? (
            <div className="flex items-center justify-center h-40"><RefreshCw size={20} className="animate-spin text-bronze" /></div>
          ) : filtered.length === 0 ? (
            <div className="rounded-xl border border-parchment bg-white-pure p-10 text-center"><p className="text-[0.8125rem] text-stone/60">No leads found</p></div>
          ) : (
            <>
              {/* Select All + Bulk Actions */}
              <div className="flex items-center gap-3 mb-2 rounded-xl border border-parchment bg-white-pure px-4 py-2.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                    className="h-4 w-4 rounded border-parchment text-bronze accent-bronze focus:ring-bronze/20 cursor-pointer"
                  />
                  <span className="text-[0.75rem] font-medium text-graphite">
                    {selected.size === 0
                      ? `Select all (${filtered.length})`
                      : `${selected.size} selected`}
                  </span>
                </label>
                {selected.size > 0 && (
                  <div className="flex items-center gap-2 ml-auto">
                    <Dropdown
                      value={bulkStatus}
                      onChange={(v) => setBulkStatus(v as LeadStatus | "")}
                      placeholder="Change status..."
                      options={[
                        { value: "new", label: "New" },
                        { value: "viewed", label: "Viewed" },
                        { value: "contacted", label: "Contacted" },
                        { value: "converted", label: "Converted" },
                        { value: "lost", label: "Lost" },
                      ]}
                    />
                    <button
                      onClick={bulkUpdateStatus}
                      disabled={!bulkStatus}
                      className="rounded-lg bg-bronze/10 border border-bronze/20 px-3 py-1.5 text-[0.75rem] font-semibold text-bronze transition-all duration-200 hover:bg-bronze/20 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      Apply
                    </button>
                    <button
                      onClick={bulkDelete}
                      className="rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-[0.75rem] font-semibold text-red-600 transition-all duration-200 hover:bg-red-100"
                    >
                      Delete ({selected.size})
                    </button>
                    <button
                      onClick={() => setSelected(new Set())}
                      className="rounded-lg border border-parchment px-2.5 py-1.5 text-[0.75rem] font-medium text-stone hover:text-ink transition-all"
                    >
                      Clear
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-2 overflow-y-auto pr-1 max-h-[60vh]">
                {filtered.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setOpen(lead)}
                    className={`w-full text-left rounded-xl border bg-white-pure p-4 transition-all duration-200 hover:shadow-md active:scale-[0.995] group cursor-pointer ${
                      selected.has(lead.id)
                        ? "border-bronze/50 bg-bronze/5"
                        : "border-parchment hover:border-bronze/30"
                    }`}
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <input
                          type="checkbox"
                          checked={selected.has(lead.id)}
                          onClick={(e) => e.stopPropagation()}
                          onChange={() => toggleSelect(lead.id)}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-parchment text-bronze accent-bronze focus:ring-bronze/20 cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <span className="text-[0.875rem] font-semibold text-ink group-hover:text-bronze transition-colors duration-200">{lead.name}</span>
                            <span className={`inline-flex items-center rounded-full px-2 py-px text-[0.5625rem] font-bold uppercase tracking-wider ${STATUS_COLORS[lead.status]}`}>
                              {STATUS_LABELS[lead.status]}
                            </span>
                            <span className="inline-flex items-center rounded-full bg-parchment/60 px-2 py-px text-[0.5625rem] font-semibold text-graphite/70">
                              {SERVICE_LABELS[lead.service] || lead.service}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[0.6875rem] text-stone/60">
                            <span className="flex items-center gap-1"><Phone size={10} className="text-bronze/60" /> {lead.phone}</span>
                            <span className="flex items-center gap-1"><Mail size={10} className="text-bronze/60" /> {lead.email}</span>
                            {lead.vehicle && <span className="flex items-center gap-1"><Car size={10} className="text-bronze/60" /> {lead.vehicle}</span>}
                            <span className="flex items-center gap-1"><Clock size={10} className="text-stone/40" /> {fmtDate(lead.createdAt)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-ink px-3 py-1.5 text-[0.6875rem] font-semibold text-white-pure">
                          <Eye size={11} /> View
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {filtered.length > 0 && (
          <div className="shrink-0 py-2 text-center text-[0.625rem] text-stone/40 border-t border-parchment/50 bg-white-pure">
            Showing {filtered.length} of {leads.length}
          </div>
        )}
      </main>
      <Footer />

      {/* Detail modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm p-4 animate-in fade-in duration-200" onClick={() => setOpen(null)}>
          <div className="w-full max-w-lg max-h-[90dvh] overflow-y-auto rounded-2xl bg-white-pure shadow-2xl animate-in zoom-in-95 fade-in duration-200" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white-pure border-b border-parchment px-6 py-4 flex items-start justify-between z-10">
              <div>
                <h2 className="text-lg font-semibold text-ink">{open.name}</h2>
                <p className="text-[0.6875rem] text-stone mt-0.5">{fmtDate(open.createdAt)}</p>
              </div>
              <button onClick={() => setOpen(null)} className="rounded-lg p-1.5 transition-all duration-200 hover:bg-parchment">
                <X size={16} className="text-stone" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider ${STATUS_COLORS[open.status]}`}>
                  {STATUS_LABELS[open.status]}
                </span>
                <span className="inline-flex items-center rounded-full bg-parchment/60 px-2.5 py-1 text-[0.625rem] font-semibold text-graphite">
                  {SERVICE_LABELS[open.service] || open.service || "N/A"}
                </span>
              </div>

              <div className="rounded-xl bg-ivory p-4 space-y-3">
                <InfoRow icon={<Phone size={14} />} value={open.phone} href={`tel:${open.phone}`} />
                <InfoRow icon={<Mail size={14} />} value={open.email} href={`mailto:${open.email}`} />
                {open.vehicle && <InfoRow icon={<Car size={14} />} value={open.vehicle} />}
                {open.message && (
                  <div className="flex items-start gap-3">
                    <MessageSquare size={14} className="text-bronze shrink-0 mt-0.5" />
                    <span className="text-[0.8125rem] text-graphite leading-relaxed">{open.message}</span>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[0.625rem] font-bold uppercase tracking-widest text-stone/40 mb-2">Actions</p>
                <div className="flex flex-wrap gap-2">
                  {open.status === "new" && (
                    <>
                      <ActionBtn icon={<Eye size={12} />} label="Mark Viewed" onClick={() => setStatus(open.id, "viewed")} />
                      <ActionBtn icon={<PhoneCall size={12} />} label="Mark Contacted" onClick={() => setStatus(open.id, "contacted")} />
                      <ActionBtn icon={<XCircle size={12} />} label="Mark Lost" variant="danger" onClick={() => setStatus(open.id, "lost")} />
                    </>
                  )}
                  {open.status === "viewed" && (
                    <>
                      <ActionBtn icon={<PhoneCall size={12} />} label="Mark Contacted" onClick={() => setStatus(open.id, "contacted")} />
                      <ActionBtn icon={<XCircle size={12} />} label="Mark Lost" variant="danger" onClick={() => setStatus(open.id, "lost")} />
                    </>
                  )}
                  {open.status === "contacted" && (
                    <>
                      <ActionBtn icon={<CheckCircle size={12} />} label="Mark Converted" variant="success" onClick={() => setStatus(open.id, "converted")} />
                      <ActionBtn icon={<XCircle size={12} />} label="Mark Lost" variant="danger" onClick={() => setStatus(open.id, "lost")} />
                    </>
                  )}
                  {open.status === "converted" && (
                    <p className="text-[0.75rem] text-emerald-600 font-medium">This lead has been converted.</p>
                  )}
                  {open.status === "lost" && (
                    <p className="text-[0.75rem] text-stone/50 font-medium">This lead was lost.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="sticky bottom-0 bg-white-pure border-t border-parchment px-6 py-3 flex justify-between items-center">
              <button
                onClick={() => del(open.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-[0.75rem] font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-[0.97]"
              >
                <Trash2 size={12} /> Delete
              </button>
              <button onClick={() => setOpen(null)} className="rounded-lg border border-parchment px-4 py-1.5 text-[0.75rem] font-medium text-graphite transition-all duration-200 hover:bg-graphite/5 active:scale-[0.97]">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-xl bg-ink px-5 py-2.5 text-[0.8125rem] font-medium text-white-pure shadow-xl animate-in slide-in-from-bottom-2 fade-in duration-200">
          {toast}
        </div>
      )}
    </>
  );
}

function InfoRow({ icon, value, href }: { icon: React.ReactNode; value: string; href?: string }) {
  const inner = <span className="text-[0.8125rem] text-graphite">{value}</span>;
  return (
    <div className="flex items-center gap-3">
      <span className="text-bronze shrink-0">{icon}</span>
      {href ? <a href={href} className="hover:text-bronze transition-colors duration-200">{inner}</a> : inner}
    </div>
  );
}

function ActionBtn({ icon, label, onClick, variant = "default" }: {
  icon: React.ReactNode; label: string; onClick: () => void; variant?: "default" | "success" | "danger";
}) {
  const s = {
    default: "border-parchment bg-white-pure text-graphite hover:border-bronze/30 hover:bg-bronze/5",
    success: "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100",
    danger: "border-red-200 bg-red-50 text-red-600 hover:bg-red-100",
  };
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-[0.75rem] font-semibold transition-all duration-200 active:scale-[0.97] ${s[variant]}`}>
      {icon} {label}
    </button>
  );
}

function Dropdown({ value, onChange, placeholder, options }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex items-center gap-2 rounded-xl border bg-white-pure px-3 py-2.5 text-[0.8125rem] transition-all duration-200 ${
          open ? "border-bronze ring-2 ring-bronze/10" : "border-parchment hover:border-sand/40"
        } ${value ? "text-ink" : "text-stone"}`}
      >
        <span className="truncate max-w-[120px]">{selected ? selected.label : placeholder}</span>
        <svg className={`h-3.5 w-3.5 shrink-0 text-stone transition-transform duration-200 ${open ? "rotate-180" : ""}`} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4.5L6 8.5L10 4.5" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 mt-1.5 w-full min-w-[160px] rounded-xl border border-parchment bg-white-pure py-1.5 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { onChange(opt.value); setOpen(false); }}
              className={`w-full px-3 py-2 text-left text-[0.8125rem] transition-colors duration-100 ${
                opt.value === value
                  ? "bg-bronze/10 text-bronze font-semibold"
                  : "text-graphite hover:bg-parchment/50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}