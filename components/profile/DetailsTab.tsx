"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";

export function DetailsTab() {
  const { user, updateProfile, signOut } = useAuth();
  const { push } = useToast();
  const [phone, setPhone] = useState(user?.phone ?? "");
  const dirty = phone !== (user?.phone ?? "");

  if (!user) return null;

  return (
    <div className="max-w-md space-y-5">
      <div className="flex items-center gap-4">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-herb text-xl font-semibold text-paper">
          {user.name.charAt(0)}
        </span>
        <div>
          <p className="font-display text-lg text-ink">{user.name}</p>
          <p className="text-sm text-ink/50">{user.email}</p>
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-medium text-ink/60">Phone number</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Add a phone number"
          className="w-full rounded-card border border-ink/15 bg-white/60 px-3.5 py-2.5 text-sm focus:border-ink/35 focus:outline-none"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          disabled={!dirty}
          onClick={() => {
            updateProfile({ phone });
            push("Details saved");
          }}
        >
          Save changes
        </Button>
        <Button variant="ghost" onClick={signOut}>
          <LogOut size={15} /> Sign out
        </Button>
      </div>
    </div>
  );
}
