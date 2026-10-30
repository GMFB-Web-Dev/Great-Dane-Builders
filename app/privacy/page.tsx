import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return <main className="legal-page"><Header /><article><h1>Privacy Policy</h1><p>Great Dane Builders Limited respects your privacy. Information submitted through this website is used only to respond to your enquiry, discuss your project and provide requested services.</p><h2>Information we collect</h2><p>We may collect your name, email address, phone number and project details when you contact us. We do not sell or rent personal information.</p><h2>Contact</h2><p>For questions about your information, email dane@gdb.co.nz.</p></article><Footer /></main>;
}
