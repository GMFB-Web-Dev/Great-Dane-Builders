import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ServiceBlock } from "@/components/sections";
import { Gallery, OutdoorLivingShowcase } from "@/components/carousels";
import { ContactIntro } from "@/components/contact";
import { Footer } from "@/components/footer";
import { VanLink } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { galleryImages } from "@/lib/site-data";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return <main><Hero image="/assets/hero-services.png" imagePosition="center 58%" title="Your Project, Built Right" text="From renovations and outdoor living to new builds and project management, GDB has the resources and trusted trades to manage projects of all sizes." secondaryLabel="About us" secondaryHref="/about" />
    <ServiceBlock id="renovations" title="Renovations, Additions & Alterations" image="/assets/hero-renovations.png"><p>From full home renovations to additions and alterations, GDB works with existing homes to create spaces that suit the way you live. With particular experience and passion for restoring villas and bungalows, the team combines quality workmanship with practical problem-solving while respecting the character of the original home.</p><VanLink href="/services/renovations" variant="dark">Learn more</VanLink></ServiceBlock>
    <Reveal><OutdoorLivingShowcase /></Reveal>
    <ServiceBlock id="new-builds" title="New Builds" image="/assets/new-build.jpg" bullets={["Residential new home construction", "Site preparation and foundations", "Structural building and framing", "Interior and exterior building work", "Coordination of required sub-trades", "Construction through to completion"]}><p>A new build gives you the opportunity to create a home around your plans, property and the way you want to live. From the initial building stages through to completion, the work can be managed across the different elements required to turn approved plans into a finished home.</p></ServiceBlock>
    <Reveal><Gallery images={galleryImages.slice(2)} title="" dark={false} /></Reveal>
    <ServiceBlock id="project-management" title="Project Management" image="/assets/project-management.png" dark imageFirst bullets={["Plumbers", "Electricians", "Tilers", "Painters and plasterers", "Drainlayers", "Excavators", "Other specialist sub-trades as required", "Council inspections"]}><p>Building and renovation projects often involve more than the building work itself. Project management brings the different trades, stages and requirements together, helping ensure work happens in the right order and the project continues moving.</p><p>An established network of trusted sub-trades can be coordinated around the requirements of each project, providing one organised approach.</p></ServiceBlock>
    <Reveal><Gallery images={galleryImages.slice(1)} title="" /></Reveal><Reveal><ContactIntro /></Reveal><Footer /></main>;
}
