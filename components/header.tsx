"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""} ${open ? "site-header--open" : ""}`}>
      <div className="header-inner">
        <Logo />
        <button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)}><span /><span /><span /></button>
        <nav className="main-nav" aria-label="Primary navigation">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} className={active ? "is-active" : ""} href={item.href} aria-current={active ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>;
          })}
        </nav>
        <div className="header-phone"><VanLink href={contact.phoneHref}>{contact.phoneDisplay}</VanLink></div>
      </div>
    </header>
  );
}
