"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contact } from "@/lib/site-data";
import { Logo } from "./brand";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const pathname = usePathname();

  return (
    <footer id="footer" className="site-footer">
      <div className="footer-top">
        <Logo className="footer-logo" />
        <nav aria-label="Footer navigation">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} className={active ? "is-active" : ""} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
          })}
        </nav>
        <div className="social-links">
          <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle className="social-icon-dot" cx="17.4" cy="6.6" r="1" />
            </svg>
          </a>
          <a href={contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9.25" />
              <path className="social-icon-fill" d="M13.35 20v-7h2.35l.35-2.72h-2.7V8.54c0-.79.22-1.33 1.36-1.33h1.45V4.78c-.25-.03-1.11-.11-2.12-.11-2.1 0-3.54 1.28-3.54 3.64v1.97H8.12V13h2.38v7h2.85Z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <a href="https://www.gmfb.co.nz/" target="_blank" rel="noreferrer">© Developed by GMFB LTD. All rights reserved.</a>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
