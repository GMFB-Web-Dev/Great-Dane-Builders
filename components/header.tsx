"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact } from "@/lib/site-data";
import { Logo, VanLink } from "./brand";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Header() {
  const pathname = usePathname();
  return <SiteHeader key={pathname} pathname={pathname} />;
}

function SiteHeader({ pathname }: { pathname: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mobileViewport = window.matchMedia("(max-width: 780px)");
    const onBreakpointChange = () => {
      if (!mobileViewport.matches) setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    mobileViewport.addEventListener("change", onBreakpointChange);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      mobileViewport.removeEventListener("change", onBreakpointChange);
    };
  }, [open]);

  return (
    <header ref={headerRef} className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${open ? "site-header--open" : ""}`}>
      <div className="header-inner">
        <Logo onClick={closeMenu} />
        <button ref={toggleRef} className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}><span /><span /><span /></button>
        <nav id="primary-navigation" className="main-nav" aria-label="Primary navigation">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} className={active ? "is-active" : ""} href={item.href} aria-current={active ? "page" : undefined} onClick={closeMenu}>{item.label}</Link>;
          })}
        </nav>
        <div className="header-phone"><VanLink href={contact.phoneHref}>{contact.phoneDisplay}</VanLink></div>
      </div>
    </header>
  );
}
