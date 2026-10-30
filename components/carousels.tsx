"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { galleryImages, services, testimonials } from "@/lib/site-data";

function Arrows({ onPrev, onNext, label }: { onPrev: () => void; onNext: () => void; label: string }) {
  return <div className="slider-arrows"><button type="button" onClick={onPrev} aria-label={`Previous ${label}`}>‹</button><button type="button" onClick={onNext} aria-label={`Next ${label}`}>›</button></div>;
}

export function ServicesCarousel() {
  const [index, setIndex] = useState(0);
  const ordered = useMemo(() => [...services.slice(index), ...services.slice(0, index)], [index]);
  const move = (amount: number) => setIndex((value) => (value + amount + services.length) % services.length);
  return (
    <section className="dark-panel services-carousel">
      <h2>Your Home. Our Expertise.</h2>
      <div className="service-cards">
        {ordered.slice(0, 3).map((service) => <Link className="service-card" href={service.href} key={service.title}><Image src={service.image} alt="" fill sizes="(max-width: 700px) 80vw, 29vw" /><span className="card-shade" /><strong>{service.title}</strong><small>Learn more →</small></Link>)}
      </div>
      <div className="slider-controls"><div className="slider-dots">{services.map((_, dot) => <button key={dot} type="button" aria-label={`Show service ${dot + 1}`} className={dot === index ? "is-active" : ""} onClick={() => setIndex(dot)} />)}</div><Arrows onPrev={() => move(-1)} onNext={() => move(1)} label="service" /></div>
    </section>
  );
}

export function Gallery({ images = galleryImages, title = "Our Work", dark = true }: { images?: typeof galleryImages; title?: string; dark?: boolean }) {
  const [index, setIndex] = useState(0);
  const ordered = useMemo(() => [...images.slice(index), ...images.slice(0, index)], [images, index]);
  const move = (amount: number) => setIndex((value) => (value + amount + images.length) % images.length);
  return (
    <section className={`${dark ? "dark-panel" : ""} gallery-section`}>
      <h2>{title}</h2>
      <div className="gallery-track">{ordered.slice(0, 4).map((item, i) => <div className="gallery-image" key={`${item.src}-${i}`}><Image src={item.src} alt={item.alt} fill sizes="(max-width: 700px) 80vw, 25vw" /></div>)}</div>
      <div className="slider-controls"><div className="slider-dots">{images.map((_, dot) => <button key={dot} type="button" aria-label={`Show image ${dot + 1}`} className={dot === index ? "is-active" : ""} onClick={() => setIndex(dot)} />)}</div><Arrows onPrev={() => move(-1)} onNext={() => move(1)} label="gallery image" /></div>
    </section>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const move = (amount: number) => setIndex((value) => (value + amount + testimonials.length) % testimonials.length);
  const current = testimonials[index];
  return (
    <section className="dark-panel testimonial-section"><h2>Trusted By Our Clients</h2><div className="testimonial-row"><button type="button" onClick={() => move(-1)} aria-label="Previous testimonial">‹</button><blockquote><p>{current.quote}</p><cite>{current.name}</cite></blockquote><button type="button" onClick={() => move(1)} aria-label="Next testimonial">›</button></div><div className="slider-dots">{testimonials.map((_, dot) => <button key={dot} type="button" aria-label={`Show testimonial ${dot + 1}`} className={dot === index ? "is-active" : ""} onClick={() => setIndex(dot)} />)}</div></section>
  );
}
