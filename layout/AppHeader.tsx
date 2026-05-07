"use client";

import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";
import { IconBell, IconHamburger, IconLogout, IconX } from "@intentui/icons";
// import { HiMenuAlt2, HiX, HiOutlineLogout, HiOutlineBell } from "react-icons/hi";

const AppHeader: React.FC = () => {
  const [logoutLoading, setLogoutLoading] = useState(false);
  const { isMobileOpen, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { data: session, status } = useSession();

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      toggleSidebar();
    } else {
      toggleMobileSidebar();
    }
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await signOut({ callbackUrl: "/login" });
    setLogoutLoading(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 dark:bg-[#0a0a0a]/80 dark:border-white/5">
      <div className="px-4 h-20 flex items-center justify-between gap-4">

        {/* --- LEFT SECTION --- */}
        <div className="flex items-center gap-4">
          {/* Sidebar Toggle Button */}
          <button
            className="flex items-center justify-center w-10 h-10 text-slate-500 rounded-xl hover:bg-slate-50 transition-all active:scale-95 dark:text-slate-400 dark:hover:bg-white/5 border border-transparent hover:border-slate-100 dark:hover:border-white/10"
            onClick={handleToggle}
          >
            {isMobileOpen ? (
              <IconX className="text-xl" />
            ) : (
              <IconHamburger className="text-xl" />
            )}
          </button>

          {/* Logo (Hanya muncul di Mobile) */}
          <Link href="/" className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 bg-[#C0202A] rounded-lg flex items-center justify-center shadow-lg shadow-[#C0202A]/20">
              <span className="text-white font-black text-sm">C</span>
            </div>
            <span className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white">
              Certi<span className="text-[#C0202A]">Path</span>
            </span>
          </Link>
        </div>

        {/* --- RIGHT SECTION --- */}
        <div className="flex items-center gap-2 sm:gap-4">

          {/* Notification Badge (Estetika Premium) */}
          <button className="hidden sm:flex items-center justify-center w-10 h-10 text-slate-400 hover:text-[#C0202A] transition-colors relative">
            <IconBell className="text-xl" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#C0202A] rounded-full border-2 border-white dark:border-[#0a0a0a]"></span>
          </button>

          <div className="h-6 w-px bg-slate-100 dark:bg-white/10 hidden sm:block mx-2"></div>

          {/* USER AREA */}
          <div className="flex items-center gap-3">
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-slate-100 animate-pulse"></div>
            ) : session?.user ? (
              <div className="flex items-center gap-3 pl-2">
                {/* User Info (Desktop only) */}
                <div className="hidden md:flex flex-col items-end">
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-wider dark:text-white leading-none">
                    {session.user.name}
                  </span>
                  <span className="text-[9px] font-bold text-[#C0202A] uppercase tracking-widest mt-1">
                    Authorized Admin
                  </span>
                </div>

                {/* Avatar Image */}
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-[#C0202A] to-red-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt="user"
                      width={36}
                      height={36}
                      className="rounded-full border-2 border-white shadow-sm dark:border-[#1a1a1a]"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-slate-900 flex items-center justify-center text-[10px] font-bold text-white border-2 border-white dark:border-[#1a1a1a]">
                      {session.user.name?.substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Logout Button (Minimalist Style) */}
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-[#C0202A] transition-all active:scale-95 disabled:opacity-50 dark:bg-white/5"
                  title="Logout"
                >
                  {logoutLoading ? (
                    <div className="w-4 h-4 border-2 border-[#C0202A] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <IconLogout className="text-lg" />
                  )}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;