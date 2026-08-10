import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

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

const LEADS = "leads";

export async function fetchLeads(): Promise<Lead[]> {
  const snap = await getDocs(query(collection(db, LEADS), orderBy("createdAt", "desc")));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Lead));
}

export async function addLead(data: {
  name: string;
  phone: string;
  email: string;
  service?: string;
  vehicle?: string;
  message?: string;
}): Promise<Lead> {
  const now = new Date().toISOString();
  const docRef = await addDoc(collection(db, LEADS), {
    ...data,
    status: "new",
    createdAt: now,
    updatedAt: now,
  });
  return { id: docRef.id, name: data.name, phone: data.phone, email: data.email, service: data.service || "", vehicle: data.vehicle || "", message: data.message || "", status: "new", createdAt: now, updatedAt: now };
}

export async function updateLeadStatus(id: string, status: LeadStatus): Promise<void> {
  const ref = doc(db, LEADS, id);
  await updateDoc(ref, { status, updatedAt: new Date().toISOString() });
}

export async function deleteLead(id: string): Promise<void> {
  await deleteDoc(doc(db, LEADS, id));
}
