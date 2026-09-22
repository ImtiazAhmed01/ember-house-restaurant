"use client";

import { createContext, useContext } from "react";
import { Profile } from "@/lib/types";
import { useLocalStorage } from "@/lib/useLocalStorage";
import { FIREBASE_IS_CONFIGURED } from "@/lib/firebase";

interface AuthContextValue {
  user: Profile | null;
  hydrated: boolean;
  firebaseReady: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => void;
  updateProfile: (patch: Partial<Profile>) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const GUEST_PRESETS = [
  { name: "Ayesha Rahman", email: "ayesha.rahman@gmail.com" },
  { name: "Tanvir Hasan", email: "tanvir.hasan@gmail.com" },
  { name: "Nusrat Jahan", email: "nusrat.jahan@gmail.com" },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser, hydrated] = useLocalStorage<Profile | null>("eh_user", null);

  // Placeholder for firebase's signInWithPopup(auth, googleProvider).
  // Kept async and network-shaped on purpose, so swapping in the real
  // implementation later is a one-line change in this function only.
  async function signInWithGoogle() {
    await new Promise((r) => setTimeout(r, 550));
    const preset = GUEST_PRESETS[Math.floor(Math.random() * GUEST_PRESETS.length)];
    setUser({
      name: preset.name,
      email: preset.email,
      phone: "",
      avatarSeed: preset.email,
    });
  }

  function signOut() {
    setUser(null);
  }

  function updateProfile(patch: Partial<Profile>) {
    setUser((u) => (u ? { ...u, ...patch } : u));
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        hydrated,
        firebaseReady: FIREBASE_IS_CONFIGURED,
        signInWithGoogle,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
