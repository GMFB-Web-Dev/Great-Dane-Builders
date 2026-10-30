import { AboutPreview, Credentials, Values } from "@/components/sections";
import { ContactForm, ContactIntro } from "@/components/contact";
import { Footer } from "@/components/footer";
import { Gallery, ServicesCarousel, Testimonials } from "@/components/carousels";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";

export default function Home() {
  return (
    <main>
      <Hero image="/assets/hero-home.jpg" imagePosition="center 60%" title="Restoring The Past. Building The Future." text="Your home should work for you. We renovate, extend and create indoor and outdoor spaces that suit your everyday life, managing the build from start to finish." />
      <AboutPreview />
      <Reveal><ServicesCarousel /></Reveal>
      <Credentials />
      <Reveal><Gallery /></Reveal>
      <Values />
      <Reveal><Testimonials /></Reveal>
      <Reveal><ContactIntro /></Reveal>
      <Reveal><ContactForm /></Reveal>
      <Footer />
    </main>
  );
}
