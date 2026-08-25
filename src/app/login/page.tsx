"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [error, setError] = useState("");

  async function signIn() {
    setError("");
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: { redirectTo: process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || `${window.location.origin}/auth/callback` },
    });
    if (signInError) setError(signInError.message);
  }

  return <main className="mx-auto max-w-md py-16"><div className="glass-panel rounded-3xl border border-slate-800 p-8 text-center space-y-5"><p className="text-xs font-mono uppercase tracking-widest text-cyan-400">Staff access</p><h1 className="text-3xl font-extrabold text-white">Sign in with Discord</h1><p className="text-sm leading-relaxed text-slate-400">Farm management is limited to authorized TheySix staff accounts.</p><button onClick={signIn} className="w-full rounded-xl bg-[#5865F2] px-5 py-3 font-bold text-white hover:bg-[#4752C4]">Continue with Discord</button>{error && <p className="text-sm text-red-300">{error}</p>}</div></main>;
}