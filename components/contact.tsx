"use client";

import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { enquiryServices } from "@/lib/enquiries";
import { contact } from "@/lib/site-data";
import { VanArtwork } from "./brand";

const contactIcons = {
  email: "/assets/contact-email.svg",
  phone: "/assets/contact-phone.svg",
  location: "/assets/contact-location.svg",
};

function ContactIcon({ type }: { type: "email" | "phone" | "location" }) {
  return <span className="contact-icon" aria-hidden="true"><Image src={contactIcons[type]} alt="" width={35} height={35} unoptimized /></span>;
}

export function ContactIntro({ title = "Let’s Talk About Your Build", lead = "Thinking about renovating, extending or building? Get in touch with Great Dane Builders to discuss your project, ask questions and take the first step towards a well-managed build." }: { title?: string; lead?: string }) {
  return <section className="contact-intro"><h2>{title}</h2><div className="title-rule title-rule--dark" /><p>{lead}</p><div className="contact-grid"><a href={`mailto:${contact.email}`}><ContactIcon type="email" /><strong>Email</strong><span>{contact.email}</span></a><a href={contact.phoneHref}><ContactIcon type="phone" /><strong>Phone</strong><span>{contact.phoneDisplay}</span></a><a href={contact.map} target="_blank" rel="noreferrer"><ContactIcon type="location" /><strong>Location</strong><span>Auckland</span></a></div></section>;
}

export function ContactMap({ wide = false }: { wide?: boolean }) {
  return (
    <div className={wide ? "contact-map-wide" : "map-card"}>
      <iframe
        src={contact.mapEmbed}
        title={`Google Map showing ${contact.mapLabel}`}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function ContactForm({ wide = false }: { wide?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const submissionId = useRef<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    submissionId.current ??= crypto.randomUUID();
    setStatus("sending");
    setStatusMessage("Sending your enquiry…");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Idempotency-Key": submissionId.current,
        },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          service: form.get("service"),
          message: form.get("message"),
          company: form.get("company"),
        }),
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;

      if (!response.ok) {
        throw new Error(result?.error || "We could not send your enquiry. Please try again.");
      }

      formElement.reset();
      submissionId.current = null;
      setStatus("success");
      setStatusMessage("Thanks — your enquiry has been sent. Dane and Pat will be in touch.");
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error
          ? error.message
          : "We could not send your enquiry. Please try again.",
      );
    }
  }

  function resetSubmissionAfterEdit() {
    if (status === "sending") return;
    submissionId.current = null;
    if (status !== "idle") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  return (
    <section className={`contact-form-section ${wide ? "contact-form-section--wide" : ""}`}>
      <form onSubmit={submit} onChange={resetSubmissionAfterEdit} aria-busy={status === "sending"}><h2>Get In Touch</h2><label>Name<input name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Name" disabled={status === "sending"} /></label><label>Email<input name="email" required type="email" maxLength={254} autoComplete="email" placeholder="Enter your email" disabled={status === "sending"} /></label><label>Select a Service<select name="service" required defaultValue="" disabled={status === "sending"}><option value="" disabled>Select one...</option>{enquiryServices.map((service) => <option key={service}>{service}</option>)}</select></label><label>Message<textarea name="message" required minLength={10} maxLength={5000} placeholder="Type your message here..." disabled={status === "sending"} /></label><label className="form-honeypot" aria-hidden="true">Company<input name="company" tabIndex={-1} autoComplete="off" disabled={status === "sending"} /></label><button className="form-submit" type="submit" disabled={status === "sending"}><VanArtwork /><span>{status === "sending" ? "Sending…" : "Submit"}</span></button><p className={`form-status form-status--${status}`} role={status === "error" ? "alert" : "status"} aria-live="polite">{statusMessage}</p></form>
      {!wide && <ContactMap />}
    </section>
  );
}
