import Image from "next/image";
import { Header } from "./header";
import { VanLink } from "./brand";

export function Hero({ image, title, text, secondaryLabel = "Services", secondaryHref = "/services", imagePosition = "center" }: { image: string; title: string; text: string; secondaryLabel?: string; secondaryHref?: string; imagePosition?: string }) {
  return (
    <section className="hero">
      <Image className="hero-image" src={image} alt="" fill priority sizes="100vw" style={{ objectPosition: imagePosition }} />
      <div className="hero-shade" />
      <Header />
      <div className="hero-content">
        <h1>{title}</h1>
        <div className="title-rule" />
        <p>{text}</p>
        <div className="hero-actions">
          <VanLink href="/contact">Contact</VanLink>
          <VanLink href={secondaryHref}>{secondaryLabel}</VanLink>
        </div>
      </div>
    </section>
  );
}
