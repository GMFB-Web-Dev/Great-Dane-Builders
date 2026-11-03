import type { Metadata } from "next";
import { Hero } from "@/components/hero";
import { ContactForm, ContactIntro, ContactMap } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = { title: "Contact Us" };

export default function ContactPage() {
  return <main><Hero image="/assets/hero-contact-build.jpg" imagePosition="center" title="Your Build Starts Here" text="Whether you’re planning a renovation, alteration, outdoor living project or something completely new, get in touch with the Great Dane Builders team to start the conversation." secondaryLabel="About us" secondaryHref="/about" />
    <Reveal><ContactIntro title="Ready to Get Started?" lead="Tell us a little about your project, what you’re looking to achieve and where you’re based. Fill out the form or contact us directly and we’ll be in touch to discuss the next steps." /></Reveal>
    <Reveal><ContactForm wide /></Reveal>
    <Reveal><ContactMap wide /></Reveal><Footer /></main>;
}
