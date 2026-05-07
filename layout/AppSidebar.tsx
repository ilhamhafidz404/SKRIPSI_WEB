"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "../context/SidebarContext";
import {
  IconCartFill,
  IconDashboardFill,
  IconPeopleFill,
} from "@intentui/icons";

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

const navItems: NavItem[] = [
  {
    icon: <IconDashboardFill />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <IconPeopleFill />,
    name: "User",
    path: "/user",
  },
  {
    icon: <IconCartFill />,
    name: "Product",
    path: "/product",
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const pathname = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => path === pathname, [pathname]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) => {
      if (prev && prev.type === menuType && prev.index === index) return null;
      return { type: menuType, index };
    });
  };

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-2">
      {items.map((nav, index) => {
        const active = nav.path ? isActive(nav.path) : false;
        const hasSubItems = !!nav.subItems;
        const isSubmenuOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;

        return (
          <li key={nav.name} className="relative">
            {hasSubItems ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-300 group ${isSubmenuOpen
                  ? "bg-slate-50 dark:bg-white/5 text-[#C0202A]"
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5"
                  } ${!isExpanded && !isHovered ? "justify-center" : "justify-start"}`}
              >
                <span className={`text-xl transition-colors ${isSubmenuOpen ? "text-[#C0202A]" : "text-slate-400 group-hover:text-[#C0202A]"}`}>
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="ml-3 text-[11px] font-bold uppercase tracking-[0.15em]">{nav.name}</span>
                )}
              </button>
            ) : (
              <Link
                href={nav.path || "#"}
                className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-500 group relative ${active
                  ? "bg-[#C0202A] text-white shadow-[0_10px_20px_rgba(192,32,42,0.25)]"
                  : "text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-900"
                  } ${!isExpanded && !isHovered ? "justify-center" : "justify-start"}`}
              >
                <span className={`text-xl transition-colors duration-300 ${active ? "text-white" : "text-slate-400 group-hover:text-[#C0202A]"}`}>
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="ml-3 text-[11px] font-bold uppercase tracking-[0.15em]">{nav.name}</span>
                )}
                {/* Active Indicator Dot */}
                {active && !isExpanded && !isHovered && (
                  <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </Link>
            )}

            {/* Submenu Render */}
            {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
              <div
                ref={(el) => { subMenuRefs.current[`${menuType}-${index}`] = el; }}
                className="overflow-hidden transition-all duration-300"
                style={{ height: isSubmenuOpen ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px" }}
              >
                <ul className="mt-2 ml-10 space-y-1 border-l border-slate-100 dark:border-white/5 pl-4">
                  {nav.subItems.map((sub) => (
                    <li key={sub.name}>
                      <Link
                        href={sub.path}
                        className={`block py-2 text-[10px] font-bold uppercase tracking-widest transition-colors ${isActive(sub.path) ? "text-[#C0202A]" : "text-slate-400 hover:text-slate-900 dark:hover:text-white"
                          }`}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-500 ease-in-out z-50 bg-white dark:bg-[#0a0a0a] border-r border-slate-100 dark:border-white/5 flex flex-col
        ${isExpanded || isHovered || isMobileOpen ? "w-[280px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* --- LOGO SECTION --- */}
      <div className={`py-10 flex items-center h-24 ${!isExpanded && !isHovered ? "justify-center" : "px-8"}`}>
        <Link href="/" className="flex items-center gap-3">
          <div className="min-w-[42px] h-[42px] bg-[#C0202A] rounded-2xl flex items-center justify-center shadow-lg shadow-[#C0202A]/30 transition-transform active:scale-95">
            <span className="text-white font-black text-xl">C</span>
          </div>
          {(isExpanded || isHovered || isMobileOpen) && (
            <div className="flex flex-col animate-[fadeIn_0.4s_ease-out]">
              <h1 className="text-lg font-black tracking-[0.15em] text-slate-900 dark:text-white uppercase leading-none">
                Certi<span className="text-[#C0202A]">Path</span>
              </h1>
              <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-1">Authentic System</span>
            </div>
          )}
        </Link>
      </div>

      {/* --- NAVIGATION SECTION --- */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4">
        <nav className="space-y-8">
          <div>
            <h2 className={`mb-4 text-[9px] font-black uppercase tracking-[0.4em] text-slate-300 dark:text-white/20 ${!isExpanded && !isHovered ? "text-center" : "px-4"}`}>
              {isExpanded || isHovered || isMobileOpen ? "Main Menu" : "•••"}
            </h2>
            {renderMenuItems(navItems, "main")}
          </div>
        </nav>
      </div>

      {/* --- FOOTER SECTION --- */}
      <div className="p-6 border-t border-slate-100 dark:border-white/5">
        <div className={`flex items-center ${!isExpanded && !isHovered ? "justify-center" : "gap-3"}`}>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-[10px] font-bold text-slate-400">
            AD
          </div>
          {(isExpanded || isHovered || isMobileOpen) && (
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase">Administrator</span>
              <span className="text-[8px] text-slate-400 uppercase tracking-tighter">Redline Apparel</span>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </aside>
  );
};

export default AppSidebar;