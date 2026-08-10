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
import { auth, googleProvider } from "@/lib/firebase";

const ALLOWED_EMAIL = "sukhrajsingh7773@gmail.com";

async function auditLog(action: string, email?: string, extra?: string) {
  try {
    await fetch("/api/audit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, email, message: extra }),
    });
  } catch {}
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
      await auditLog("login_success", email);
      return "";
    } catch (e: any) {
      await auditLog("login_failed", email, e.code);
      if (e.code === "auth/invalid-credential") return "Invalid email or password";
      if (e.code === "auth/user-not-found") return "No account found with this email.";
      return "Login failed. Try again.";
    }
  }, []);

  const loginGoogle = useCallback(async (): Promise<string> => {
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email || "";

      if (email !== ALLOWED_EMAIL) {
        await auditLog("google_login_blocked", email, "Non-allowed Google account");
        await signOut(auth);
        return "Access denied. Only authorized account allowed.";
      }

      const creationTime = result.user.metadata.creationTime;
      const lastSignInTime = result.user.metadata.lastSignInTime;
      if (creationTime === lastSignInTime) {
        await auditLog("google_login_blocked", email, "New account signup attempt — deleted");
        try { await result.user.delete(); } catch {}
        await signOut(auth);
        return "Signup not allowed. Contact admin.";
      }

      await auditLog("google_login_success", email);
      return "";
    } catch (e: any) {
      if (e.code === "auth/popup-closed-by-user") return "";
      if (e.code === "auth/account-exists-with-different-credential") {
        return "An account already exists with this email.";
      }
      return "Google sign-in failed.";
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
