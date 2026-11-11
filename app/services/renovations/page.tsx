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
    <ServiceBlock id="renovations" title="Renovations" image="/assets/renovations.png" imageAlt="Renovated interior with timber feature wall">
      <p>Renovating gives you the opportunity to improve how your existing home looks, feels and functions without starting again. From individual spaces to substantial full-home renovations, the work can be planned around your existing property and what you want to achieve.</p>
      <strong>Renovation work can include:</strong>
      <ul>
        <li>Kitchen renovations</li>
        <li>Bathroom and laundry renovations</li>
        <li>Living areas and bedrooms</li>
        <li>Internal layout changes</li>
        <li>Wall removal and structural changes</li>
        <li>New finishes and interior building work</li>
        <li>Full-home renovations</li>
      </ul>
      <p>Working within an existing home can uncover challenges that are not always visible at the beginning. Careful planning and practical problem-solving help address these as they arise, while bringing the old and new parts of the home together in a way that feels functional and considered.</p>
    </ServiceBlock>
    <ServiceBlock id="villas" title="Restoring Villas & Bungalows" image="/assets/villa.png" imageAlt="Restored character villa exterior with original veranda detailing" dark imageFirst showTitleRule={false}>
      <p>Villas and bungalows have character that is worth preserving, but renovating an older home often requires a different approach. GDB has particular experience and a genuine interest in working with character homes, where original features, older construction methods and unexpected challenges can all form part of the project.</p>
      <strong>Villa and bungalow work can include:</strong>
      <ul>
        <li>Restoring original character features</li>
        <li>Renovating kitchens and bathrooms</li>
        <li>Repairing and replacing existing building elements</li>
        <li>Internal layout changes</li>
        <li>Structural building work</li>
        <li>Modernising older areas of the home</li>
        <li>Integrating new work with the existing style</li>
      </ul>
      <p>Older homes can reveal surprises once work begins, so these projects often require careful thinking and practical solutions. The aim is to improve how the home functions for modern living while respecting the details and character that make villas and bungalows distinctive.</p>
    </ServiceBlock>
    <ServiceBlock id="additions" title="Additions & Alterations" image="/assets/alterations.jpg" imageAlt="Interior addition and alteration framing under construction">
      <p>When your existing home no longer gives you the space or layout you need, an addition or alteration can help make it work better without having to move. Projects can range from changing the internal layout through to extending the footprint of the home to create valuable extra space.</p>
      <strong>Additions and alterations can include:</strong>
      <ul>
        <li>Home extensions</li>
        <li>Additional bedrooms</li>
        <li>New or extended living areas</li>
        <li>Internal layout changes</li>
        <li>Removing or repositioning walls</li>
        <li>Structural alterations</li>
        <li>Connecting new spaces to the existing home</li>
      </ul>
      <p>The key is making sure the changes feel like they belong. New areas need to work with the existing structure, layout and style of the property while meeting the practical needs of the household. Whether adding more room or reworking what is already there, the result should feel connected to the original home rather than added on as an afterthought.</p>
    </ServiceBlock>
    <Reveal><Gallery images={[galleryImages[5], galleryImages[0], { src: "/assets/hero-renovations.png", alt: "Finished renovation detail" }, { src: "/assets/alterations.jpg", alt: "Addition framing in progress" }, ...galleryImages.slice(1, 4)]} /></Reveal>
    <Reveal><ContactIntro /></Reveal><Reveal><ContactForm /></Reveal><Footer /></main>;
}
