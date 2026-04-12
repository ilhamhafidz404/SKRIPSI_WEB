"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/");
    }
  }, [status, router]);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/" });
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF]">
        <div className="w-9 h-9 border-2 border-[#C0202A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#FFF] px-4 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(192,32,42,0.08)_1px,_transparent_1px)] [background-size:28px_28px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_#E8DDD5_100%)]" />

      {/* Card */}
      <div className="relative w-full max-w-sm bg-[#FAF7F2] shadow-[0_0_0_1px_rgba(192,32,42,0.1),0_4px_6px_rgba(192,32,42,0.06),0_20px_60px_rgba(44,26,26,0.12)] overflow-hidden animate-[fadeUp_0.5s_ease]">
        {/* Top bar */}
        <div className="h-1 bg-gradient-to-r from-[#8B0000] via-[#C0202A] to-[#E8312A]" />

        <div className="px-10 py-9">
          {/* Logo */}
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#C0202A40]" />

            <div className="w-14 h-14 rounded-full border border-[#C0202A25] bg-[#C0202A10] flex items-center justify-center">
              <span className="text-[#C0202A] font-bold text-lg">R</span>
            </div>

            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#C0202A40]" />
          </div>

          {/* Brand */}
          <p className="text-[9px] tracking-[0.5em] text-[#C0202A] uppercase text-center font-mono mb-1">
            Redline Apparel
          </p>

          <h1 className="text-2xl tracking-[0.18em] text-[#2C1A1A] uppercase text-center mb-1">
            CertiPath
          </h1>

          <p className="text-[8px] tracking-[0.35em] text-[#2C1A1A40] uppercase text-center font-mono">
            Product Authentication System
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#C0202A20]" />
            <div className="w-2 h-2 rotate-45 bg-[#C0202A50]" />
            <div className="flex-1 h-px bg-[#C0202A20]" />
          </div>

          {/* Tagline */}
          <p className="text-sm text-[#2C1A1A80] text-center leading-relaxed mb-6">
            Sign in to access the dashboard and manage product authenticity
            records secured by blockchain.
          </p>

          {/* Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-[#C0202A40] bg-[#FAF7F2] hover:bg-[#F5EFE7] transition shadow-sm active:scale-95"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-[#C0202A] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs tracking-widest font-mono">
                  Signing in...
                </span>
              </>
            ) : (
              <>
                <GoogleIcon />
                <span className="text-xs tracking-widest font-mono uppercase">
                  Continue with Google
                </span>
              </>
            )}
          </button>

          {/* Footer */}
          <p className="text-[8px] tracking-[0.2em] text-[#2C1A1A40] uppercase text-center mt-5 font-mono">
            Access is restricted to authorized personnel only.
          </p>
        </div>

        {/* Bottom bar */}
        <div className="h-1 bg-gradient-to-r from-[#8B0000] via-[#C0202A] to-[#E8312A]" />
      </div>

      {/* Footer */}
      <p className="mt-6 text-[8px] tracking-[0.25em] text-[#2C1A1A40] uppercase font-mono">
        © {new Date().getFullYear()} Redline Apparel · CertiPath v1.0
      </p>

      {/* Animation */}
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.6-.05-1.2-.16-1.8H9v3.4h4.8c-.2 1.1-.8 2-1.7 2.7v2.2h2.9c1.7-1.5 2.6-3.8 2.6-6.5z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.4 0 4.4-.8 5.9-2.1l-2.9-2.2c-.8.5-1.8.8-3 .8-2.3 0-4.3-1.6-5-3.7H1v2.3C2.6 16.5 5.6 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M4 10.7c-.2-.5-.3-1.1-.3-1.7s.1-1.2.3-1.7V5H1C.4 6.2 0 7.6 0 9s.4 2.8 1 4l3-2.3z"
      />
      <path
        fill="#EA4335"
        d="M9 3.6c1.3 0 2.5.4 3.4 1.3l2.6-2.6C13.4.9 11.4 0 9 0 5.6 0 2.6 1.5 1 4l3 2.3c.7-2.1 2.7-3.7 5-3.7z"
      />
    </svg>
  );
}
