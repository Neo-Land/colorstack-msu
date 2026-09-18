"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useActionState } from "react";
import { signIn } from "./actions";
import { siteConfig } from "../seo";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(signIn, null);
  return (
    <main className="flex-1 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md flex flex-col gap-8">
        {/* Logo + wordmark */}
        <div className="flex flex-col items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={44}
              height={44}
              className="object-contain"
              priority
            />
            <span className="text-slate-950 font-bold text-2xl tracking-tight">
              MSU <span className="text-[#D1190D]">ColorStack</span>
            </span>
          </Link>
          <p className="text-slate-500 text-sm">Admin sign in</p>
        </div>
        {/* Card */}
        <form
          action={formAction}
          className="rounded-2xl border border-slate-200 bg-white p-8 flex flex-col gap-6 shadow-xl shadow-slate-200/80"
        >
          {/* Error message returned from the server action */}
          {state?.error && (
            <p className="text-red-500 text-sm text-center -mb-2">
              {state.error}
            </p>
          )}

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@montclair.edu"
              required
              className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 placeholder-slate-400 text-sm outline-none focus:border-[#D1190D] focus:ring-1 focus:ring-[#D1190D] transition-colors"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-700 text-sm font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-950 placeholder-slate-400 text-sm outline-none focus:border-[#D1190D] focus:ring-1 focus:ring-[#D1190D] transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 transition-colors text-xs font-medium"
                aria-label="Toggle password visibility"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit, disabled while the action is in flight */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full bg-[#D1190D] text-white font-semibold py-3.5 rounded-full hover:bg-[#A8140A] active:scale-95 transition-all duration-200 shadow-lg shadow-red-900/40 mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </main>
  );
}
