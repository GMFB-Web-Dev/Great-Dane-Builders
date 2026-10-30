import Link from "next/link";
import { contact } from "@/lib/site-data";
import { Logo } from "./brand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <Logo className="footer-logo" />
        <nav aria-label="Footer navigation">
          <Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/about">About Us</Link><Link href="/contact">Contact Us</Link>
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
