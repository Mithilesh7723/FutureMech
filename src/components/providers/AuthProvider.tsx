"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
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
      if (e.code === "auth/invalid-credential") return "Invalid email or password";
      if (e.code === "auth/user-not-found") return "No account found with this email.";
      return "Login failed. Try again.";
    }
  };

  const loginGoogle = async (): Promise<string> => {
    try {
      googleProvider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const email = result.user.email;

      // Block non-allowed accounts
      if (email !== ALLOWED_EMAIL) {
        await signOut(auth);
        return "Access denied. Only authorized account allowed.";
      }

      // Check if this is a newly created account (signup attempt)
      const creationTime = result.user.metadata.creationTime;
      const lastSignInTime = result.user.metadata.lastSignInTime;
      if (creationTime === lastSignInTime) {
        // This is a new account — delete it and sign out
        try {
          await result.user.delete();
        } catch {}
        await signOut(auth);
        return "Signup not allowed. Contact admin.";
      }

      return "";
    } catch (e: any) {
      if (e.code === "auth/popup-closed-by-user") return "";
      if (e.code === "auth/account-exists-with-different-credential") {
        return "An account already exists with this email.";
      }
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
