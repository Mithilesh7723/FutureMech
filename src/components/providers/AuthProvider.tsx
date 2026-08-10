"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

const ALLOWED_EMAIL = "sukhrajsingh7773@gmail.com";

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

  const loginEmail = async (email: string, password: string): Promise<string> => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return "";
    } catch (e: any) {
      return e.code === "auth/invalid-credential"
        ? "Invalid email or password"
        : "Login failed. Try again.";
    }
  };

  const loginGoogle = async (): Promise<string> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user.email !== ALLOWED_EMAIL) {
        await signOut(auth);
        return "Access denied. Only authorized account allowed.";
      }
      return "";
    } catch (e: any) {
      if (e.code === "auth/popup-closed-by-user") return "";
      return "Google sign-in failed.";
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginEmail, loginGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
