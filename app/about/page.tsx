import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { Credentials, Values } from "@/components/sections";
import { Testimonials } from "@/components/carousels";
import { ContactForm, ContactIntro } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { VanLink } from "@/components/brand";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return <main><Hero image="/assets/hero-about.jpg" imagePosition="center 55%" title="Built On Experience." text="A hands-on Auckland building team bringing practical experience, dependable project management and quality workmanship to every build." />
    <Reveal><section className="split-feature meet-gdb"><div className="feature-placeholder" aria-label="Team image placeholder" /><div><h2>Meet GDB</h2><div className="title-rule title-rule--dark" /><p>At the heart of Great Dane Builders are directors Dane and Pat, son and father with very different backgrounds who bring complementary strengths to the business. Dane is a qualified builder who completed his apprenticeship through BCITO before building his experience across Auckland’s residential construction industry.</p><p>Behind the scenes, Pat brings years of corporate, management and accounting experience. He looks after the administration, bookkeeping, costing, finances and contracts that keep GDB organised and projects well supported.</p><p>Today, Dane works on site alongside an apprentice, with trusted contractors, labour hire and specialist sub-trades brought in as needed. And then there’s Pixie, their Boxer and unofficial member of the GDB crew.</p><VanLink href="/contact" variant="dark">Contact</VanLink></div></section></Reveal>
    <Values dark /><Credentials /><Reveal><Testimonials /></Reveal><Reveal><ContactIntro /></Reveal><Reveal><ContactForm /></Reveal><Footer /></main>;
}
