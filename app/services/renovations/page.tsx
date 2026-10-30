import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ServiceBlock } from "@/components/sections";
import { Gallery } from "@/components/carousels";
import { ContactForm, ContactIntro } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";
import { galleryImages } from "@/lib/site-data";

export const metadata: Metadata = { title: "Renovations, Additions & Alterations" };

export default function RenovationsPage() {
  return <main><Hero image="/assets/hero-renovations.png" imagePosition="center" title="Renovate. Restore. Extend." text="From full renovations and character home restorations to additions and alterations, create a home that works better for the way you live while respecting what is already there." />
    <ServiceBlock id="renovations" title="Renovations" image="/assets/renovations.png" bullets={["Kitchen renovations", "Bathroom and laundry renovations", "Living areas and bedrooms", "Internal layout changes", "Wall removal and structural changes", "New finishes and interior building work", "Full-home renovations"]}><p>Renovating gives you the opportunity to improve how your existing home looks, feels and functions without starting again. From individual spaces to substantial full-home renovations, the work can be planned around your existing property and what you want to achieve.</p><p>Working within an existing home can uncover challenges that are not always visible at the beginning. Careful planning and practical problem-solving help address these as they arise.</p></ServiceBlock>
    <ServiceBlock id="villas" title="Restoring Villas & Bungalows" image="/assets/villa.png" dark imageFirst bullets={["Restoring original character features", "Renovating kitchens and bathrooms", "Repairing and replacing existing building elements", "Internal layout changes", "Structural building work", "Modernising older areas of the home", "Integrating new work with the existing style"]}><p>Villas and bungalows have character that is worth preserving, but renovating an older home often requires a different approach. GDB has particular experience and a genuine interest in working with character homes.</p></ServiceBlock>
    <ServiceBlock id="additions" title="Additions & Alterations" image="/assets/alterations.jpg" bullets={["Home extensions", "Additional bedrooms", "New or extended living areas", "Internal layout changes", "Removing or repositioning walls", "Structural alterations", "Connecting new spaces to the existing home"]}><p>When your existing home no longer gives you the space or layout you need, an addition or alteration can help make it work better without having to move. Projects can range from changing the internal layout through to extending the footprint of the home.</p></ServiceBlock>
    <Reveal><Gallery images={[galleryImages[5], galleryImages[0], { src: "/assets/hero-renovations.png", alt: "Finished renovation detail" }, { src: "/assets/alterations.jpg", alt: "Addition framing in progress" }, ...galleryImages.slice(1, 4)]} /></Reveal>
    <Reveal><ContactIntro /></Reveal><Reveal><ContactForm /></Reveal><Footer /></main>;
}
