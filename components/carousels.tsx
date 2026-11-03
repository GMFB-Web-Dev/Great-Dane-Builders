"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { galleryImages, services, testimonials } from "@/lib/site-data";
import { ChevronIcon, InlineArrowIcon } from "./icons";

function Arrows({ onPrev, onNext, label }: { onPrev: () => void; onNext: () => void; label: string }) {
  return <><button className="carousel-arrow carousel-arrow--prev" type="button" onClick={onPrev} aria-label={`Previous ${label}`}><ChevronIcon direction="left" /></button><button className="carousel-arrow carousel-arrow--next" type="button" onClick={onNext} aria-label={`Next ${label}`}><ChevronIcon direction="right" /></button></>;
}

function useAutoCarousel(length: number, delay: number) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % length), delay);
    return () => window.clearInterval(timer);
  }, [delay, length, paused]);

  return {
    index,
    setIndex,
    interactionProps: {
      onMouseEnter: () => setPaused(true),
      onMouseLeave: () => setPaused(false),
      onFocusCapture: () => setPaused(true),
      onBlurCapture: () => setPaused(false),
    },
  };
}

export function ServicesCarousel() {
  const { index, setIndex, interactionProps } = useAutoCarousel(services.length, 5200);
  const ordered = useMemo(() => [...services.slice(index), ...services.slice(0, index)], [index]);
  const move = (amount: number) => setIndex((value) => (value + amount + services.length) % services.length);
  return (
    <section className="dark-panel services-carousel" {...interactionProps}>
      <h2>Your Home. Our Expertise.</h2>
      <div className="carousel-stage services-stage">
        <div className="service-cards" key={index}>
          {ordered.slice(0, 3).map((service) => <Link className="service-card" href={service.href} key={service.title}><Image src={service.image} alt="" fill quality={100} sizes="(max-width: 700px) 82vw, 29vw" /><span className="card-shade" /><strong>{service.title}</strong><small><span>Learn more</span><InlineArrowIcon /></small></Link>)}
        </div>
        <Arrows onPrev={() => move(-1)} onNext={() => move(1)} label="service" />
      </div>
      <div className="slider-controls"><div className="slider-dots">{services.map((_, dot) => <button key={dot} type="button" aria-label={`Show service ${dot + 1}`} className={dot === index ? "is-active" : ""} onClick={() => setIndex(dot)} />)}</div></div>
    </section>
  );
}

export function Gallery({ images = galleryImages, title = "Our Work", dark = true }: { images?: typeof galleryImages; title?: string; dark?: boolean }) {
  const { index, setIndex, interactionProps } = useAutoCarousel(images.length, 4600);
  const ordered = useMemo(() => [...images.slice(index), ...images.slice(0, index)], [images, index]);
  const move = (amount: number) => setIndex((value) => (value + amount + images.length) % images.length);
  return (
    <section className={`${dark ? "dark-panel" : ""} gallery-section`} {...interactionProps}>
      <h2>{title}</h2>
      <div className="carousel-stage gallery-stage"><div className="gallery-track" key={index}>{ordered.slice(0, 4).map((item, i) => <div className="gallery-image" key={`${item.src}-${i}`}><Image src={item.src} alt={item.alt} fill quality={100} sizes="(max-width: 780px) calc(100vw - 44px), 25vw" /></div>)}</div><Arrows onPrev={() => move(-1)} onNext={() => move(1)} label="gallery image" /></div>
      <div className="slider-controls"><div className="slider-dots">{images.map((_, dot) => <button key={dot} type="button" aria-label={`Show image ${dot + 1}`} className={dot === index ? "is-active" : ""} onClick={() => setIndex(dot)} />)}</div></div>
    </section>
  );
}

export function Testimonials() {
  const { index, setIndex, interactionProps } = useAutoCarousel(testimonials.length, 6500);
  const move = (amount: number) => setIndex((value) => (value + amount + testimonials.length) % testimonials.length);
  const current = testimonials[index];
  return (
    <section className="dark-panel testimonial-section" {...interactionProps}><h2>Trusted By Our Clients</h2><div className="testimonial-row"><button className="carousel-arrow testimonial-arrow" type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><ChevronIcon direction="left" /></button><blockquote key={index}><p>{current.quote}</p><cite>{current.name}</cite></blockquote><button className="carousel-arrow testimonial-arrow" type="button" onClick={() => move(1)} aria-label="Next testimonial"><ChevronIcon direction="right" /></button></div><div className="slider-dots">{testimonials.map((_, dot) => <button key={dot} type="button" aria-label={`Show testimonial ${dot + 1}`} className={dot === index ? "is-active" : ""} onClick={() => setIndex(dot)} />)}</div></section>
  );
}
