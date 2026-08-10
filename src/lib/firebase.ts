import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAFUP48gXsyVYmz1ZF1BGb1RAkf6fDsN9o",
  authDomain: "futuremech-6c313.firebaseapp.com",
  projectId: "futuremech-6c313",
  storageBucket: "futuremech-6c313.firebasestorage.app",
  messagingSenderId: "356034396454",
  appId: "1:356034396454:web:a280bfa0494775d67e81e7",
  measurementId: "G-WEW5E0KMW2",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

if (typeof window !== "undefined") {
  getAnalytics(app);
}
