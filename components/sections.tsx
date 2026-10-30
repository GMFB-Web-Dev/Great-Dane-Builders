import Image from "next/image";
import { values } from "@/lib/site-data";
import { Reveal } from "./reveal";
import { VanLink } from "./brand";

export function Values({ dark = false }: { dark?: boolean }) {
  return (
    <Reveal><section className={`${dark ? "dark-panel values-section--dark" : ""} values-section`}><h2>What We Stand By</h2><div className="title-rule title-rule--dark" /><div className="values-grid">{values.map((value) => <article key={value.title}><span className="value-icon">{value.icon}</span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></section></Reveal>
  );
}

export function Credentials() {
  return (
    <Reveal><section className="credentials"><h2>Building With Confidence</h2><div className="title-rule title-rule--dark" /><p>Great Dane Builders brings LBP credentials, full insurance cover and a 10-year guarantee to residential building projects. With a hands-on approach, clear communication and a commitment to quality workmanship, we take care of the details from start to finish, giving you confidence that your home is in capable hands throughout your renovation or new build.</p><Image src="/assets/lbp-logo.png" alt="Licensed Building Practitioners" width={382} height={150} /></section></Reveal>
  );
}

export function AboutPreview() {
  return (
    <Reveal><section className="split-feature about-preview"><div><h2>About Us</h2><div className="title-rule title-rule--dark" /><p>Established in 2017, Great Dane Builders specialises in renovations, additions and alterations, villa and bungalow restorations, outdoor living and new builds. We take a hands-on approach, coordinating trusted trades and managing each project from start to finish.</p><p>Dane is a qualified builder with a background in residential construction and around seven years as a foreman before co-founding GDB. Pat draws on corporate and accounting experience to keep the business organised and projects well supported.</p><p>Our mission is to restore the past and build the future through quality workmanship, integrity and flexibility.</p><VanLink href="/about" variant="dark">About us</VanLink></div><div className="feature-placeholder" aria-label="Project image placeholder" /></section></Reveal>
  );
}

export function ServiceBlock({ id, title, image, dark = false, imageFirst = false, children, bullets }: { id: string; title: string; image: string; dark?: boolean; imageFirst?: boolean; children: React.ReactNode; bullets?: string[] }) {
  return (
    <Reveal><section id={id} className={`service-block ${dark ? "service-block--dark dark-panel" : ""} ${imageFirst ? "service-block--image-first" : ""}`}><div className="service-copy"><h2>{title}</h2><div className={`title-rule ${dark ? "" : "title-rule--dark"}`} />{children}{bullets && <><strong>This service can include:</strong><ul>{bullets.map((item) => <li key={item}>{item}</li>)}</ul></>}</div><div className="service-image"><Image src={image} alt="" fill sizes="(max-width: 700px) 100vw, 50vw" /></div></section></Reveal>
  );
}
