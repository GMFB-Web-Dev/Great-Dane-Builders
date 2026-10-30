"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { contact } from "@/lib/site-data";

function ContactIcon({ type }: { type: "email" | "phone" | "location" }) {
  return <span className="contact-icon" aria-hidden>{type === "email" ? "✉" : type === "phone" ? "☎" : "⌖"}</span>;
}

export function ContactIntro({ title = "Let’s Talk About Your Build", lead = "Thinking about renovating, extending or building? Get in touch with Great Dane Builders to discuss your project, ask questions and take the first step towards a well-managed build." }: { title?: string; lead?: string }) {
  return <section className="contact-intro"><h2>{title}</h2><div className="title-rule title-rule--dark" /><p>{lead}</p><div className="contact-grid"><a href={`mailto:${contact.email}`}><ContactIcon type="email" /><strong>Email</strong><span>{contact.email}</span></a><a href={contact.phoneHref}><ContactIcon type="phone" /><strong>Phone</strong><span>{contact.phoneDisplay}</span></a><a href={contact.map} target="_blank" rel="noreferrer"><ContactIcon type="location" /><strong>Location</strong><span>Auckland</span></a></div></section>;
}

export function ContactForm({ wide = false }: { wide?: boolean }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = encodeURIComponent(`Website enquiry: ${form.get("service") || "Building project"}`);
    const body = encodeURIComponent(`Name: ${form.get("name")}\nEmail: ${form.get("email")}\nService: ${form.get("service")}\n\n${form.get("message")}`);
    setSent(true);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
  }
  return (
    <section className={`contact-form-section ${wide ? "contact-form-section--wide" : ""}`}>
      <form onSubmit={submit}><h2>Get In Touch</h2><label>Name<input name="name" required placeholder="Name" /></label><label>Email<input name="email" required type="email" placeholder="Enter your email" /></label><label>Select a Service<select name="service" required defaultValue=""><option value="" disabled>Select one...</option><option>Renovations, Additions & Alterations</option><option>Outdoor Living</option><option>New Builds</option><option>Project Management</option></select></label><label>Message<textarea name="message" required placeholder="Type your message here..." /></label><button className="form-submit" type="submit"><Image src="/assets/van-light.png" alt="" width={2172} height={724} /><span>Submit</span></button>{sent && <p className="form-status">Your email app should open with the enquiry ready to send.</p>}</form>
      {!wide && <a className="map-card" href={contact.map} target="_blank" rel="noreferrer" aria-label="Open Great Dane Builders location in Google Maps"><Image src="/assets/auckland-map.png" alt="Map of the Auckland service area" fill sizes="(max-width: 700px) 100vw, 50vw" /></a>}
    </section>
  );
}
