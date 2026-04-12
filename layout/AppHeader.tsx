"use client";

import { useSidebar } from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "next-auth/react";

const AppHeader: React.FC = () => {
  const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
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

  const toggleApplicationMenu = () => {
    setApplicationMenuOpen(!isApplicationMenuOpen);
  };

  const handleLogout = async () => {
    setLogoutLoading(true);
    await signOut({ callbackUrl: "/login" });
    setLogoutLoading(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <header className="sticky top-0 flex w-full bg-white border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
      <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        {/* LEFT SECTION */}
        <div className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
          {/* Toggle Sidebar */}
          <button
            className="items-center justify-center w-10 h-10 text-gray-500 border-gray-200 rounded-lg z-50 dark:border-gray-800 lg:flex dark:text-gray-400 lg:h-11 lg:w-11 lg:border"
            onClick={handleToggle}
          >
            {isMobileOpen ? <span>✖</span> : <span>☰</span>}
          </button>

          {/* Logo */}
          <Link href="/" className="lg:hidden">
            <Image
              width={120}
              height={30}
              src="/images/logo/logo.svg"
              alt="Logo"
            />
          </Link>

          {/* Search */}
          <div className="hidden lg:block w-full max-w-md">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search or type command..."
                className="w-full h-11 pl-4 pr-12 rounded-lg border border-gray-200 bg-transparent text-sm dark:border-gray-800 dark:bg-gray-900 dark:text-white"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                ⌘K
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div
          className={`${
            isApplicationMenuOpen ? "flex" : "hidden"
          } items-center justify-between w-full gap-4 px-5 py-4 lg:flex lg:justify-end lg:px-0`}
        >
          {/* USER AREA */}
          <div className="flex items-center gap-4">
            {status === "loading" && (
              <div className="text-sm text-gray-400">Loading...</div>
            )}

            {session?.user && (
              <>
                {/* User Info */}
                <div className="flex items-center gap-2">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="user"
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  )}
                  <span className="text-sm font-medium text-gray-700 dark:text-white">
                    {session.user.name}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="px-3 py-1.5 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50"
                >
                  {logoutLoading ? "Logging out..." : "Logout"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
