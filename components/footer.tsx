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
    <footer className="site-footer">
      <div className="footer-top">
        <Logo className="footer-logo" />
        <nav aria-label="Footer navigation">
          {nav.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return <Link key={item.href} className={active ? "is-active" : ""} href={item.href} aria-current={active ? "page" : undefined}>{item.label}</Link>;
          })}
        </nav>
        <div className="social-links">
          <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">◎</a>
          <a href={contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">f</a>
        </div>
      </div>
      <div className="footer-bottom">
        <a href="https://www.gmfb.co.nz/" target="_blank" rel="noreferrer">© Developed by GMFB LTD. All rights reserved.</a>
        <Link href="/privacy">Privacy Policy</Link>
      </div>
    </footer>
  );
}
