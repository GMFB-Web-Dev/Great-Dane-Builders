import Image from "next/image";
import { values } from "@/lib/site-data";
import { Reveal } from "./reveal";
import { VanLink } from "./brand";

export function Values({ dark = false }: { dark?: boolean }) {
  return (
    <Reveal><section className={`${dark ? "dark-panel values-section--dark" : ""} values-section`}><h2>What We Stand By</h2><div className="title-rule title-rule--dark" /><div className="values-grid">{values.map((value) => <article key={value.title}><span className="value-icon" aria-hidden="true"><Image src={value.icon} alt="" width={1200} height={1200} unoptimized /></span><h3>{value.title}</h3><p>{value.text}</p></article>)}</div></section></Reveal>
  );
}

export function Credentials() {
  return (
    <Reveal><section className="credentials"><div className="credentials-title"><h2>Building With Confidence</h2><div className="title-rule title-rule--dark" /></div><p>Great Dane Builders brings LBP credentials, full insurance cover and a 10-year guarantee to residential building projects. With a hands-on approach, clear communication and a commitment to quality workmanship, we take care of the details from start to finish, giving you confidence that your home is in capable hands throughout your renovation or new build.</p><Image src="/assets/lbp-logo.png" alt="Licensed Building Practitioners" width={382} height={150} unoptimized /></section></Reveal>
  );
}

export function AboutPreview() {
  return (
    <Reveal><section id="about" className="split-feature about-preview"><div><h2>About Us</h2><div className="title-rule title-rule--dark" /><p>Established in 2017, Great Dane Builders specialises in renovations, additions and alterations, villa and bungalow restorations, outdoor living and new builds. We take a hands-on approach, coordinating trusted trades and managing each project from start to finish.</p><p>Dane is a qualified builder with a background in residential construction and around seven years as a foreman before co-founding GDB. He brings practical thinking, technical skill and high standards to every build. Pat draws on his corporate and accounting experience to oversee costing, finances and administration, keeping the business organised and projects well supported.</p><p>Our mission is to restore the past and build the future through quality workmanship, integrity and flexibility. We believe in clear communication, tidy sites and dependable follow-through. Whether we’re updating one space or managing a full renovation, we aim to be a safe pair of hands you can trust.</p><VanLink href="/about" variant="dark">About us</VanLink></div><div className="feature-placeholder" aria-label="Project image placeholder" /></section></Reveal>
  );
}

export function ServiceBlock({ id, title, image, imageAlt = "", imagePosition = "center", dark = false, imageFirst = false, showTitleRule = true, children, bullets }: { id: string; title: string; image: string; imageAlt?: string; imagePosition?: string; dark?: boolean; imageFirst?: boolean; showTitleRule?: boolean; children: React.ReactNode; bullets?: string[] }) {
  return (
    <Reveal><section id={id} className={`service-block ${dark ? "service-block--dark dark-panel" : ""} ${imageFirst ? "service-block--image-first" : ""}`}><div className="service-copy"><h2>{title}</h2>{showTitleRule && <div className={`title-rule ${dark ? "" : "title-rule--dark"}`} />}{children}{bullets && <><strong>This service can include:</strong><ul>{bullets.map((item) => <li key={item}>{item}</li>)}</ul></>}</div><div className="service-image"><Image src={image} alt={imageAlt} fill quality={100} sizes="(max-width: 780px) calc(100vw - 44px), 50vw" style={{ objectPosition: imagePosition }} /></div></section></Reveal>
  );
}
