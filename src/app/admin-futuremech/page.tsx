"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useAuth } from "@/components/providers/AuthProvider";
import { fetchLeads, updateLeadStatus, deleteLead } from "@/lib/leads-store";
import { fetchAuditLogs } from "@/lib/audit-log";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Trash2,
  Eye,
  Mail,
  Phone,
  Car,
  Calendar,
  Clock,
  LogOut,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Users,
  Loader2,
  Check,
  ClipboardList,
  Activity,
} from "lucide-react";

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

const SERVICE_LABELS: Record<string, string> = {
  "car-service": "Car Service",
  "denting-painting": "Denting & Painting",
  "ac-service": "AC Service",
  battery: "Battery",
  tyres: "Tyres",
  insurance: "Insurance",
  "car-wash": "Car Wash",
  detailing: "Detailing",
  other: "Other",
};

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  viewed: "Viewed",
  contacted: "Contacted",
  converted: "Converted",
  lost: "Lost",
};

const STATUS_COLORS: Record<LeadStatus, string> = {
  new: "bg-blue-100 text-blue-700 border-blue-200",
  viewed: "bg-amber-100 text-amber-700 border-amber-200",
  contacted: "bg-purple-100 text-purple-700 border-purple-200",
  converted: "bg-emerald-100 text-emerald-700 border-emerald-200",
  lost: "bg-red-100 text-red-700 border-red-200",
};

function fmtDate(d: string) {
  if (!d) return "\u2014";
  try {
    return new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return d;
  }
}

function InfoRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#8B6914]" />
      <div>
        <p className="text-xs font-medium text-[#8B6914]/60 uppercase tracking-wider">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="text-[#2C1810] hover:text-[#8B6914] transition-colors underline underline-offset-2"
          >
            {value}
          </a>
        ) : (
          <p className="text-[#2C1810]">{value || "\u2014"}</p>
        )}
      </div>
    </div>
  );
}

function ActionBtn({
  icon: Icon,
  label,
  color,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  color: string;
  onClick: () => void;
}) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200",
    purple:
      "bg-purple-50 text-purple-700 hover:bg-purple-100 border-purple-200",
    green:
      "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-emerald-200",
    red: "bg-red-50 text-red-700 hover:bg-red-100 border-red-200",
    gray: "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-all ${colorMap[color] || colorMap.gray}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function Dropdown({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-[#D4C4A8]/60 bg-white px-3 py-2 text-sm text-[#2C1810] hover:border-[#8B6914]/40 transition-colors"
      >
        <Filter className="h-4 w-4 text-[#8B6914]/60" />
        {selected?.label || placeholder}
        <ChevronDown
          className={`h-4 w-4 text-[#8B6914]/60 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="absolute top-full left-0 z-20 mt-1 min-w-[160px] rounded-lg border border-[#D4C4A8]/60 bg-white py-1 shadow-lg">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="w-full px-3 py-2 text-left text-sm text-[#2C1810] hover:bg-[#8B6914]/5 transition-colors"
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminPage() {
  const {
    loginEmail,
    loginGoogle,
    logout,
    user,
    loading: authLoading,
  } = useAuth();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<LeadStatus>("new");

  const [detailLead, setDetailLead] = useState<Lead | null>(null);

  const [activeTab, setActiveTab] = useState<"leads" | "audit">("leads");
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditLoading, setAuditLoading] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const loadLeads = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchLeads();
      setLeads(data as Lead[]);
    } catch (err: any) {
      setError(err.message || "Failed to load leads");
    } finally {
      setLoading(false);
    }
  };

  const loadAuditLogs = async () => {
    setAuditLoading(true);
    try {
      const data = await fetchAuditLogs();
      setAuditLogs(data as any[]);
    } catch {
    } finally {
      setAuditLoading(false);
    }
  };

  useEffect(() => {
    if (user) loadLeads();
  }, [user]);

  useEffect(() => {
    if (user && activeTab === "audit") loadAuditLogs();
  }, [user, activeTab]);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.vehicle.toLowerCase().includes(q) ||
        lead.service.toLowerCase().includes(q);
      const matchStatus = !statusFilter || lead.status === statusFilter;
      const matchService = !serviceFilter || lead.service === serviceFilter;
      return matchSearch && matchStatus && matchService;
    });
  }, [leads, search, statusFilter, serviceFilter]);

  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === "new").length;
    const viewed = leads.filter((l) => l.status === "viewed").length;
    const contacted = leads.filter((l) => l.status === "contacted").length;
    const converted = leads.filter((l) => l.status === "converted").length;
    return { total, new: newCount, viewed, contacted, converted };
  }, [leads]);

  const allVisibleSelected =
    filteredLeads.length > 0 && filteredLeads.every((l) => selected.has(l.id));

  const toggleSelectAll = () => {
    if (allVisibleSelected) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filteredLeads.map((l) => l.id)));
    }
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkStatus = async () => {
    if (selected.size === 0) return;
    try {
      await Promise.all(
        Array.from(selected).map((id) => updateLeadStatus(id, bulkStatus)),
      );
      setLeads((prev) =>
        prev.map((l) =>
          selected.has(l.id) ? { ...l, status: bulkStatus } : l,
        ),
      );
      setSelected(new Set());
      showToast(`Updated ${selected.size} leads`, "success");
    } catch {
      showToast("Failed to update leads", "error");
    }
  };

  const handleBulkDelete = async () => {
    if (selected.size === 0 || !confirm(`Delete ${selected.size} leads?`))
      return;
    try {
      await Promise.all(Array.from(selected).map((id) => deleteLead(id)));
      setLeads((prev) => prev.filter((l) => !selected.has(l.id)));
      setSelected(new Set());
      showToast(`Deleted ${selected.size} leads`, "success");
    } catch {
      showToast("Failed to delete leads", "error");
    }
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    try {
      await updateLeadStatus(leadId, newStatus);
      setLeads((prev) =>
        prev.map((l) =>
          l.id === leadId ? { ...l, status: newStatus } : l,
        ),
      );
      if (detailLead?.id === leadId) {
        setDetailLead((prev) =>
          prev ? { ...prev, status: newStatus } : prev,
        );
      }
      showToast(`Status updated to ${STATUS_LABELS[newStatus]}`, "success");
    } catch {
      showToast("Failed to update status", "error");
    }
  };

  const handleDelete = async (leadId: string) => {
    if (!confirm("Delete this lead?")) return;
    try {
      await deleteLead(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      setDetailLead(null);
      showToast("Lead deleted", "success");
    } catch {
      showToast("Failed to delete lead", "error");
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);
    try {
      const err = await loginEmail(email, password);
      if (err) setLoginError(err);
    } catch (err: any) {
      setLoginError(err.message || "Login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError("");
    setLoginLoading(true);
    try {
      await loginGoogle();
    } catch (err: any) {
      setLoginError(err.message || "Google login failed");
    } finally {
      setLoginLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8]">
        <Loader2 className="h-8 w-8 animate-spin text-[#8B6914]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F0E8] p-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B6914' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="w-full max-w-[400px] relative">
          <div className="text-center mb-8">
            <div className="inline-block mb-4">
              <Image
                src="/FutureMEch Logo.png"
                alt="FutureMech"
                width={180}
                height={48}
                className="h-12 w-auto mx-auto"
                priority
              />
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="h-px w-8 bg-[#8B6914]/30" />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#8B6914]">Admin Panel</p>
              <div className="h-px w-8 bg-[#8B6914]/30" />
            </div>
            <p className="text-xs text-[#8B6914]/40">Sign in to manage your leads</p>
          </div>

          <div className="bg-white rounded-3xl border border-[#D4C4A8]/40 shadow-[0_8px_40px_rgba(139,105,20,0.08)] p-8">
            {loginError && (
              <div className="mb-5 flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span className="text-[0.8125rem]">{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-[0.6875rem] font-semibold uppercase tracking-wider text-[#8B6914]/70">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D4C4A8]/50 bg-[#FAF8F4] px-4 py-3 text-[0.875rem] text-[#2C1810] placeholder-[#2C1810]/30 focus:border-[#8B6914] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B6914]/10 transition-all"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-[0.6875rem] font-semibold uppercase tracking-wider text-[#8B6914]/70">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-xl border border-[#D4C4A8]/50 bg-[#FAF8F4] px-4 py-3 text-[0.875rem] text-[#2C1810] placeholder-[#2C1810]/30 focus:border-[#8B6914] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#8B6914]/10 transition-all"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full rounded-xl bg-[#2C1810] py-3.5 text-[0.875rem] font-semibold text-white hover:bg-[#1A0F0A] disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.98]"
              >
                {loginLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#D4C4A8]/40" />
              </div>
              <div className="relative flex justify-center text-[0.6875rem]">
                <span className="bg-white px-4 text-[#8B6914]/40 font-medium uppercase tracking-wider">or</span>
              </div>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loginLoading}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-[#D4C4A8]/50 bg-[#FAF8F4] py-3.5 text-[0.8125rem] font-medium text-[#2C1810] hover:bg-white hover:border-[#8B6914]/30 hover:shadow-sm disabled:opacity-50 transition-all duration-200 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <p className="mt-5 text-center text-[0.625rem] text-[#8B6914]/30 font-medium">
            Protected area. Unauthorized access is logged and monitored.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
          <div
            className={`flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg ${
              toast.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="h-4 w-4" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-30 border-b border-[#D4C4A8]/60 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src="/FutureMEch Logo.png"
                alt="FutureMech"
                width={130}
                height={34}
                className="h-7 w-auto"
                priority
              />
              <span className="text-xs font-semibold text-[#8B6914]/50 uppercase tracking-wider hidden sm:inline">
                Lead Manager
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-[#8B6914]/60 hidden sm:inline">
              {user.email}
            </span>
            <a
              href="/"
              className="rounded-lg border border-[#D4C4A8]/60 px-3 py-1.5 text-xs font-medium text-[#2C1810] hover:bg-[#F5F0E8] transition-colors"
            >
              Site
            </a>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-lg border border-[#D4C4A8]/60 px-3 py-1.5 text-xs font-medium text-[#2C1810] hover:bg-[#F5F0E8] transition-colors"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-center gap-2">
          <button
            onClick={() => setActiveTab("leads")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all border ${
              activeTab === "leads"
                ? "bg-[#8B6914] text-white border-[#8B6914] shadow-md"
                : "bg-white text-[#8B6914]/70 border-[#D4C4A8]/60 hover:border-[#8B6914]/40 hover:bg-[#F5F0E8]"
            }`}
          >
            <Users className="h-4 w-4" />
            Leads
            <span
              className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                activeTab === "leads"
                  ? "bg-white/20 text-white"
                  : "bg-[#8B6914]/10 text-[#8B6914]"
              }`}
            >
              {leads.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all border ${
              activeTab === "audit"
                ? "bg-[#8B6914] text-white border-[#8B6914] shadow-md"
                : "bg-white text-[#8B6914]/70 border-[#D4C4A8]/60 hover:border-[#8B6914]/40 hover:bg-[#F5F0E8]"
            }`}
          >
            <ClipboardList className="h-4 w-4" />
            Audit Log
            <span
              className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                activeTab === "audit"
                  ? "bg-white/20 text-white"
                  : "bg-[#8B6914]/10 text-[#8B6914]"
              }`}
            >
              {auditLogs.length}
            </span>
          </button>
        </div>

        {activeTab === "leads" && (
          <>
            <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {[
                { label: "Total", value: stats.total, color: "text-[#8B6914]" },
                { label: "New", value: stats.new, color: "text-blue-600" },
                { label: "Viewed", value: stats.viewed, color: "text-amber-600" },
                { label: "Contacted", value: stats.contacted, color: "text-purple-600" },
                { label: "Converted", value: stats.converted, color: "text-emerald-600" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#D4C4A8]/60 bg-white p-4 shadow-sm"
                >
                  <p className="text-xs font-medium text-[#8B6914]/60 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8B6914]/40" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name, email, phone, vehicle..."
                  className="w-full rounded-lg border border-[#D4C4A8]/60 bg-white py-2 pl-10 pr-4 text-sm text-[#2C1810] placeholder-[#2C1810]/40 focus:border-[#8B6914] focus:outline-none focus:ring-2 focus:ring-[#8B6914]/20 transition-all"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B6914]/40 hover:text-[#8B6914]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Dropdown
                  value={statusFilter}
                  onChange={setStatusFilter}
                  placeholder="Status"
                  options={[
                    { value: "new", label: "New" },
                    { value: "viewed", label: "Viewed" },
                    { value: "contacted", label: "Contacted" },
                    { value: "converted", label: "Converted" },
                    { value: "lost", label: "Lost" },
                  ]}
                />
                <Dropdown
                  value={serviceFilter}
                  onChange={setServiceFilter}
                  placeholder="Service"
                  options={Object.entries(SERVICE_LABELS).map(([value, label]) => ({
                    value,
                    label,
                  }))}
                />
                {(statusFilter || serviceFilter || search) && (
                  <button
                    onClick={() => {
                      setStatusFilter("");
                      setServiceFilter("");
                      setSearch("");
                    }}
                    className="flex items-center gap-1 rounded-lg border border-[#D4C4A8]/60 bg-white px-3 py-2 text-xs font-medium text-[#2C1810] hover:bg-[#F5F0E8] transition-colors"
                  >
                    <X className="h-3 w-3" />
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="mb-4 flex items-center gap-3 rounded-xl border border-[#D4C4A8]/60 bg-white px-4 py-2.5 shadow-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={toggleSelectAll}
                  className="h-4 w-4 rounded border-[#D4C4A8] text-[#8B6914] focus:ring-[#8B6914]/20"
                />
                <span className="text-xs text-[#8B6914]/60">
                  {selected.size > 0
                    ? `${selected.size} selected`
                    : `Select all (${filteredLeads.length})`}
                </span>
              </label>

              {selected.size > 0 && (
                <>
                  <div className="h-4 w-px bg-[#D4C4A8]/60" />
                  <Dropdown
                    value={bulkStatus}
                    onChange={(v) => setBulkStatus(v as LeadStatus)}
                    placeholder="Set status"
                    options={[
                      { value: "new", label: "New" },
                      { value: "viewed", label: "Viewed" },
                      { value: "contacted", label: "Contacted" },
                      { value: "converted", label: "Converted" },
                      { value: "lost", label: "Lost" },
                    ]}
                  />
                  <button
                    onClick={handleBulkStatus}
                    className="flex items-center gap-1.5 rounded-lg bg-[#8B6914] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#A07A1A] transition-colors"
                  >
                    <Check className="h-3 w-3" />
                    Apply
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    className="flex items-center gap-1.5 rounded-lg bg-red-50 border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" />
                    Delete
                  </button>
                </>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#8B6914]" />
              </div>
            ) : error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
                <XCircle className="mx-auto h-8 w-8 text-red-400" />
                <p className="mt-2 text-sm text-red-700">{error}</p>
                <button
                  onClick={loadLeads}
                  className="mt-3 text-sm font-medium text-red-700 underline underline-offset-2 hover:text-red-900"
                >
                  Retry
                </button>
              </div>
            ) : filteredLeads.length === 0 ? (
              <div className="rounded-xl border border-[#D4C4A8]/60 bg-white p-12 text-center shadow-sm">
                <Users className="mx-auto h-10 w-10 text-[#8B6914]/30" />
                <p className="mt-3 text-sm text-[#8B6914]/60">No leads found</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    onClick={() => setDetailLead(lead)}
                    className="group relative flex items-center gap-4 rounded-xl border border-[#D4C4A8]/60 bg-white px-4 py-3 shadow-sm hover:border-[#8B6914]/30 hover:shadow-md transition-all cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selected.has(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                      onClick={(e) => e.stopPropagation()}
                      className="h-4 w-4 shrink-0 rounded border-[#D4C4A8] text-[#8B6914] focus:ring-[#8B6914]/20"
                    />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-sm font-semibold text-[#2C1810] truncate">
                          {lead.name}
                        </h3>
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[lead.status]}`}
                        >
                          {STATUS_LABELS[lead.status]}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-[#D4C4A8]/60 bg-[#F5F0E8] px-2 py-0.5 text-[10px] font-medium text-[#8B6914]">
                          {SERVICE_LABELS[lead.service] || lead.service}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-4 text-xs text-[#8B6914]/60 flex-wrap">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {lead.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {lead.email}
                        </span>
                        {lead.vehicle && (
                          <span className="flex items-center gap-1">
                            <Car className="h-3 w-3" />
                            {lead.vehicle}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {fmtDate(lead.createdAt)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => setDetailLead(lead)}
                      className="shrink-0 flex items-center gap-1.5 rounded-lg border border-[#D4C4A8]/60 px-3 py-1.5 text-xs font-medium text-[#2C1810] hover:bg-[#8B6914]/5 hover:border-[#8B6914]/30 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === "audit" && (
          <>
            {auditLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#8B6914]" />
              </div>
            ) : (
              <>
                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Total Attempts", value: auditLogs.length, color: "text-[#8B6914]" },
                    { label: "Successful", value: auditLogs.filter((l: any) => l.action === "login_success" || l.action === "google_login_success").length, color: "text-emerald-600" },
                    { label: "Failed", value: auditLogs.filter((l: any) => l.action === "login_failed" || l.action === "google_login_blocked").length, color: "text-red-600" },
                    { label: "Attacks", value: auditLogs.filter((l: any) => l.action === "injection_attempt").length, color: "text-red-700" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-[#D4C4A8]/60 bg-white p-4 shadow-sm"
                    >
                      <p className="text-xs font-medium text-[#8B6914]/60 uppercase tracking-wider">
                        {stat.label}
                      </p>
                      <p className={`mt-1 text-2xl font-bold ${stat.color}`}>
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {auditLogs.length === 0 ? (
                  <div className="rounded-xl border border-[#D4C4A8]/60 bg-white p-12 text-center shadow-sm">
                    <ClipboardList className="mx-auto h-10 w-10 text-[#8B6914]/30" />
                    <p className="mt-3 text-sm text-[#8B6914]/60">No audit logs yet</p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#D4C4A8]/60 bg-white shadow-sm overflow-hidden">
                    <div className="max-h-[60vh] overflow-y-auto">
                      <table className="w-full">
                        <thead className="sticky top-0 bg-[#F5F0E8]/80 backdrop-blur-sm border-b border-[#D4C4A8]/60">
                          <tr>
                            <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#8B6914]/60 uppercase tracking-wider">Time</th>
                            <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#8B6914]/60 uppercase tracking-wider">Action</th>
                            <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#8B6914]/60 uppercase tracking-wider">Email</th>
                            <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#8B6914]/60 uppercase tracking-wider">IP</th>
                            <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#8B6914]/60 uppercase tracking-wider">Field</th>
                            <th className="px-4 py-3 text-left text-[10px] font-semibold text-[#8B6914]/60 uppercase tracking-wider">Message</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D4C4A8]/40">
                          {auditLogs.map((log: any, i: number) => {
                            const actionStyles: Record<string, string> = {
                              login_success: "bg-emerald-100 text-emerald-700 border-emerald-200",
                              login_failed: "bg-red-100 text-red-700 border-red-200",
                              google_login_success: "bg-blue-100 text-blue-700 border-blue-200",
                              google_login_blocked: "bg-red-100 text-red-700 border-red-200",
                              injection_attempt: "bg-red-100 text-red-700 border-red-200",
                            };
                            const actionLabels: Record<string, string> = {
                              login_success: "Login OK",
                              login_failed: "Login Failed",
                              google_login_success: "Google OK",
                              google_login_blocked: "Google Blocked",
                              injection_attempt: "Injection",
                            };
                            return (
                              <tr key={i} className="hover:bg-[#F5F0E8]/50 transition-colors">
                                <td className="px-4 py-3 text-xs text-[#8B6914]/60 whitespace-nowrap">
                                  {fmtDate(log.timestamp || log.createdAt)}
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${actionStyles[log.action] || "bg-gray-100 text-gray-700 border-gray-200"}`}>
                                    {log.action === "injection_attempt" && <AlertCircle className="h-3 w-3" />}
                                    {actionLabels[log.action] || log.action}
                                  </span>
                                </td>
                                <td className="px-4 py-3 text-xs text-[#2C1810] max-w-[200px] truncate">
                                  {log.email || "—"}
                                </td>
                                <td className="px-4 py-3 text-xs text-[#8B6914]/60 font-mono whitespace-nowrap">
                                  {log.ip || "—"}
                                </td>
                                <td className="px-4 py-3 text-xs text-[#8B6914]/60">
                                  {log.field || "—"}
                                </td>
                                <td className="px-4 py-3 text-xs text-[#8B6914]/60 max-w-[250px] truncate">
                                  {log.message || "—"}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </main>

      {detailLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-[#2C1810]/40 backdrop-blur-sm"
            onClick={() => setDetailLead(null)}
          />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-[#D4C4A8]/60 bg-white shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-[#D4C4A8]/60 bg-white/90 backdrop-blur-md px-6 py-4 rounded-t-2xl">
              <div>
                <h2 className="text-lg font-bold text-[#2C1810]">
                  {detailLead.name}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_COLORS[detailLead.status]}`}
                  >
                    {STATUS_LABELS[detailLead.status]}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-[#D4C4A8]/60 bg-[#F5F0E8] px-2 py-0.5 text-[10px] font-medium text-[#8B6914]">
                    {SERVICE_LABELS[detailLead.service] || detailLead.service}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setDetailLead(null)}
                className="rounded-lg p-1.5 text-[#8B6914]/40 hover:bg-[#F5F0E8] hover:text-[#8B6914] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              <div className="space-y-3">
                <InfoRow
                  icon={Phone}
                  label="Phone"
                  value={detailLead.phone}
                  href={`tel:${detailLead.phone}`}
                />
                <InfoRow
                  icon={Mail}
                  label="Email"
                  value={detailLead.email}
                  href={`mailto:${detailLead.email}`}
                />
                <InfoRow icon={Car} label="Vehicle" value={detailLead.vehicle} />
                <InfoRow
                  icon={Clock}
                  label="Created"
                  value={fmtDate(detailLead.createdAt)}
                />
                <InfoRow
                  icon={Clock}
                  label="Updated"
                  value={fmtDate(detailLead.updatedAt)}
                />
              </div>

              {detailLead.message && (
                <div>
                  <p className="text-xs font-medium text-[#8B6914]/60 uppercase tracking-wider mb-1">
                    Message
                  </p>
                  <div className="rounded-lg border border-[#D4C4A8]/60 bg-[#F5F0E8]/50 p-3 text-sm text-[#2C1810]">
                    {detailLead.message}
                  </div>
                </div>
              )}

              <div>
                <p className="text-xs font-medium text-[#8B6914]/60 uppercase tracking-wider mb-2">
                  Actions
                </p>
                <div className="flex flex-wrap gap-2">
                  {detailLead.status !== "viewed" && (
                    <ActionBtn
                      icon={Eye}
                      label="Mark Viewed"
                      color="blue"
                      onClick={() => handleStatusChange(detailLead.id, "viewed")}
                    />
                  )}
                  {detailLead.status !== "contacted" && (
                    <ActionBtn
                      icon={Phone}
                      label="Mark Contacted"
                      color="purple"
                      onClick={() =>
                        handleStatusChange(detailLead.id, "contacted")
                      }
                    />
                  )}
                  {detailLead.status !== "converted" && (
                    <ActionBtn
                      icon={CheckCircle2}
                      label="Mark Converted"
                      color="green"
                      onClick={() =>
                        handleStatusChange(detailLead.id, "converted")
                      }
                    />
                  )}
                  {detailLead.status !== "lost" && (
                    <ActionBtn
                      icon={XCircle}
                      label="Mark Lost"
                      color="red"
                      onClick={() => handleStatusChange(detailLead.id, "lost")}
                    />
                  )}
                </div>
              </div>

              <div className="border-t border-[#D4C4A8]/60 pt-4">
                <ActionBtn
                  icon={Trash2}
                  label="Delete Lead"
                  color="red"
                  onClick={() => handleDelete(detailLead.id)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
