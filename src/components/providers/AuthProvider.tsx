"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
  type User,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, googleProvider, db } from "@/lib/firebase";

const ALLOWED_EMAIL = "sukhrajsingh7773@gmail.com";

async function auditLog(action: string, email?: string, extra?: string) {
  try {
    const ua = navigator.userAgent || "";
    await addDoc(collection(db, "audit_log"), {
      action,
      email: email || "",
      userAgent: ua,
      message: extra || "",
      timestamp: new Date().toISOString(),
    });
  } catch (e) {
    console.error("Audit log failed:", e);
  }
}

interface AuthCtx {
  user: User | null;
  loading: boolean;
  loginEmail: (email: string, password: string) => Promise<string>;
  loginGoogle: () => Promise<string>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  loading: true,
  loginEmail: async () => "",
  loginGoogle: async () => "",
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const loginEmail = useCallback(async (email: string, password: string): Promise<string> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      auditLog("login_success", email).catch(() => {});
      return "";
    } catch (e: any) {
      auditLog("login_failed", email, e.code).catch(() => {});
      const code = e.code || "";
      if (code === "auth/invalid-credential" || code === "auth/wrong-password" || code === "auth/user-not-found") {
        return "Invalid email or password";
      }
      if (code === "auth/too-many-requests") {
        return "Too many attempts. Try again later.";
      }
      if (code === "auth/user-disabled") {
        return "This account has been disabled.";
      }
      return `Login failed: ${code || e.message || "Unknown error"}`;
    }
  }, []);

  const loginGoogle = useCallback(async (): Promise<string> => {
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email || "";

      if (email !== ALLOWED_EMAIL) {
        auditLog("google_login_blocked", email, "Non-allowed Google account").catch(() => {});
        await signOut(auth);
        return "Access denied. Only authorized account allowed.";
      }

      const creationTime = result.user.metadata.creationTime;
      const lastSignInTime = result.user.metadata.lastSignInTime;
      if (creationTime === lastSignInTime) {
        auditLog("google_login_blocked", email, "New account signup attempt").catch(() => {});
        try { await result.user.delete(); } catch {}
        await signOut(auth);
        return "Signup not allowed. Contact admin.";
      }

      auditLog("google_login_success", email).catch(() => {});
      return "";
    } catch (e: any) {
      if (e.code === "auth/popup-closed-by-user") return "";
      if (e.code === "auth/account-exists-with-different-credential") {
        return "An account already exists with this email.";
      }
      return `Google sign-in failed: ${e.code || e.message || "Unknown"}`;
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, loginEmail, loginGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
