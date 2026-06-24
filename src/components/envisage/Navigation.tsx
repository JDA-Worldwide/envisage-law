"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LOGO_URL, NAV_ITEMS } from "@/lib/data";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 flex h-[var(--header-height)] items-center border-b border-white/[0.08] bg-brand-primary">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex w-full max-w-content items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center transition-opacity hover:opacity-80" aria-label="Envisage Law home">
          <Image src={LOGO_URL} alt="Envisage Law" width={180} height={38} className="h-[38px] w-auto" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_ITEMS.map((item) =>
            item.children ? (
              <DropdownItem key={item.href} item={item} pathname={pathname} />
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative whitespace-nowrap px-4 py-2.5 text-[14.5px] font-semibold tracking-[0.02em] transition-colors",
                  pathname === item.href || pathname.startsWith(item.href + "/")
                    ? "text-white"
                    : "text-white/95 hover:text-white"
                )}
              >
                {item.label}
                {(pathname === item.href || pathname.startsWith(item.href + "/")) && (
                  <span className="absolute bottom-0.5 left-4 right-4 h-[3px] rounded bg-brand-accent" />
                )}
              </Link>
            )
          )}
          <Link
            href="/contact"
            className="ml-2 inline-flex items-center gap-2.5 whitespace-nowrap rounded-sm bg-brand-secondary-dark px-[30px] py-[15px] text-sm font-bold uppercase tracking-[0.08em] text-white transition-all hover:-translate-y-0.5 hover:bg-brand-secondary-darker"
          >
            Contact Us
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex items-center justify-center rounded p-2 text-white hover:text-white/80 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <span className="flex flex-col gap-[5px]">
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
              <span className="block h-0.5 w-6 bg-white" />
            </span>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="absolute left-0 right-0 top-[var(--header-height)] border-b border-white/10 bg-brand-primary shadow-lg md:hidden"
        >
          <div className="flex flex-col gap-0.5 p-3">
            {NAV_ITEMS.map((item) => (
              <MobileNavItem key={item.href} item={item} pathname={pathname} />
            ))}
            <Link
              href="/contact"
              className="mt-2 flex justify-center rounded-sm bg-brand-secondary-dark px-6 py-3.5 text-sm font-bold uppercase tracking-[0.08em] text-white"
            >
              Contact Us
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

interface NavItemData {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

function DropdownItem({ item, pathname }: { item: NavItemData; pathname: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) return;
      const items = menuRef.current?.querySelectorAll<HTMLElement>("a");
      if (!items?.length) return;
      const idx = Array.from(items).findIndex((el) => el === document.activeElement);
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          items[idx < items.length - 1 ? idx + 1 : 0]?.focus();
          break;
        case "ArrowUp":
          e.preventDefault();
          items[idx > 0 ? idx - 1 : items.length - 1]?.focus();
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          (ref.current?.querySelector("button") as HTMLElement)?.focus();
          break;
      }
    },
    [open]
  );

  return (
    <div ref={ref} className="relative" onKeyDown={handleKeyDown} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <div className="relative inline-flex items-center">
        <Link
          href={item.href}
          className={cn(
            "whitespace-nowrap py-2.5 pl-4 pr-1 text-[14.5px] font-semibold tracking-[0.02em] transition-colors",
            isActive ? "text-white" : "text-white/95 hover:text-white"
          )}
        >
          {item.label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="py-2.5 pr-4 pl-1 text-white/70 hover:text-white"
          aria-expanded={open}
          aria-haspopup="true"
          aria-label="Toggle Practice Areas menu"
        >
          <svg
            className={cn("h-[9px] w-[9px] transition-transform", open && "rotate-180")}
            viewBox="0 0 12 12"
            fill="none"
          >
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {isActive && <span className="absolute bottom-0.5 left-4 right-4 h-[3px] rounded bg-brand-accent" />}
      </div>

      <div
        ref={menuRef}
        role="menu"
        aria-orientation="vertical"
        className={cn(
          "absolute left-1/2 top-[calc(100%+14px)] z-50 w-[340px] -translate-x-1/2 rounded border-t-[3px] border-t-brand-secondary bg-white p-2.5 shadow-lg transition-all",
          open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
        )}
      >
        <div className="grid grid-cols-2 gap-x-1">
          {item.children?.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              role="menuitem"
              className="block rounded px-3.5 py-2.5 text-sm font-semibold text-brand-primary hover:bg-brand-surface hover:text-brand-secondary-dark focus-visible:ring-2 focus-visible:ring-brand-secondary"
              onClick={() => setOpen(false)}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function MobileNavItem({ item, pathname }: { item: NavItemData; pathname: string }) {
  const [open, setOpen] = useState(false);
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "block rounded px-4 py-3.5 text-base font-semibold",
          isActive ? "text-white" : "text-white/95"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center justify-between rounded px-4 py-3.5 text-base font-semibold",
          isActive ? "text-white" : "text-white/95"
        )}
        aria-expanded={open}
      >
        {item.label}
        <svg className={cn("h-4 w-4 transition-transform", open && "rotate-180")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="ml-4 mt-1 space-y-1 rounded bg-white/[0.06]">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="block rounded px-4 py-2.5 text-sm text-white/95 hover:bg-white/10 hover:text-white"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
