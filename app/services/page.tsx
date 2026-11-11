import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ServiceBlock } from "@/components/sections";
import { Gallery, NewBuildsShowcase, OutdoorLivingShowcase } from "@/components/carousels";
import { ContactIntro } from "@/components/contact";
import { Footer } from "@/components/footer";
import { VanLink } from "@/components/brand";
import { Reveal } from "@/components/reveal";
import { galleryImages } from "@/lib/site-data";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return <main><Hero image="/assets/hero-services.png" imagePosition="center 58%" title="Your Project, Built Right" text="From renovations and outdoor living to new builds and project management, GDB has the resources and trusted trades to manage projects of all sizes." secondaryLabel="About us" secondaryHref="/about" />
    <ServiceBlock id="renovations" title="Renovations" image="/assets/renovations.png" imageAlt="Renovated interior with a timber screen and polished concrete floor" imagePosition="center top"><p>Renovating gives you the opportunity to improve how your existing home looks, feels and functions without starting again. From individual spaces to substantial full-home renovations, the work can be planned around your existing property and what you want to achieve.</p><strong>Renovation work can include:</strong><ul>{["Kitchen renovations", "Bathroom and laundry renovations", "Living areas and bedrooms", "Internal layout changes", "Wall removal and structural changes", "New finishes and interior building work", "Full-home renovations"].map((item) => <li key={item}>{item}</li>)}</ul><p>Working within an existing home can uncover challenges that are not always visible at the beginning. Careful planning and practical problem-solving help address these as they arise, while bringing the old and new parts of the home together in a way that feels functional and considered.</p><VanLink href="/services/renovations" variant="dark">Learn more</VanLink></ServiceBlock>
    <Reveal><OutdoorLivingShowcase /></Reveal>
    <Reveal><NewBuildsShowcase /></Reveal>
    <ServiceBlock id="project-management" title="Project Management" image="/assets/gallery-bathroom.png" imageAlt="Completed dark bathroom with twin concrete basins" dark imageFirst><p>Building and renovation projects often involve more than the building work itself. Project management brings the different trades, stages and requirements together, helping ensure work happens in the right order and the project continues moving from one stage to the next.</p><strong>This service can include:</strong><ul>{["Plumbers", "Electricians", "Tilers", "Painters and plasterers", "Drainlayers", "Excavators", "Other specialist sub-trades as required", "Council Inspections"].map((item) => <li key={item}>{item}</li>)}</ul><p>An established network of trusted sub-trades can be coordinated around the requirements of each project. This is particularly useful for kitchens, bathrooms, renovations and other projects where several specialist trades are needed. Scheduling, communication and coordination are managed throughout, providing one organised approach rather than leaving you to arrange each trade separately.</p></ServiceBlock>
    <Reveal><Gallery images={galleryImages.slice(1)} title="" /></Reveal><Reveal><ContactIntro /></Reveal><Footer /></main>;
}
