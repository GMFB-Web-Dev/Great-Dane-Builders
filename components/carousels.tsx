"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { galleryImages, services, testimonials } from "@/lib/site-data";
import { ChevronIcon, InlineArrowIcon } from "./icons";

const outdoorLivingImages = [
  { src: "/assets/outdoor-planter.jpg", alt: "New timber fence and raised planter beside a landscaped lawn" },
  { src: "/assets/outdoor-retaining.jpg", alt: "Timber retaining wall and garden area under construction" },
  { src: "/assets/outdoor-deck.jpg", alt: "Finished timber deck and outdoor seating area" },
  { src: "/assets/outdoor-path.jpg", alt: "Landscaped garden path with stone pavers" },
  { src: "/assets/outdoor-living.png", alt: "Finished timber fence and lawn" },
  { src: "/assets/outdoor-porch.jpg", alt: "Villa porch and garden bed under restoration" },
  { src: "/assets/outdoor-red-deck.jpg", alt: "Newly built timber deck behind a home" },
  { src: "/assets/outdoor-villa.jpg", alt: "Villa exterior with new retaining work" },
] as const;

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
  const pageCount = Math.ceil(services.length / 2);
  const activePage = Math.floor(index / 2);
  return (
    <section className="dark-panel services-carousel" {...interactionProps}>
      <h2>Your Home. Our Expertise.</h2>
      <div className="carousel-stage services-stage">
        <div className="service-cards" key={index}>
          {ordered.slice(0, 3).map((service) => <Link className="service-card" href={service.href} key={service.title}><Image className="service-card__image" src={service.image} alt="" fill quality={100} sizes="(max-width: 700px) 82vw, 29vw" /><span className="card-shade" /><strong>{service.title}</strong><span className="service-card__learn-more"><span>Learn more</span><InlineArrowIcon /></span></Link>)}
        </div>
        <Arrows onPrev={() => move(-1)} onNext={() => move(1)} label="service" />
      </div>
      <div className="slider-controls"><div className="slider-dots">{Array.from({ length: pageCount }, (_, page) => <button key={page} type="button" aria-label={`Show services ${page * 2 + 1} and ${Math.min(page * 2 + 2, services.length)}`} className={page === activePage ? "is-active" : ""} onClick={() => setIndex(page * 2)} />)}</div></div>
    </section>
  );
}

export function OutdoorLivingShowcase() {
  const { index, setIndex, interactionProps } = useAutoCarousel(outdoorLivingImages.length, 5600);
  const ordered = useMemo(() => [...outdoorLivingImages.slice(index), ...outdoorLivingImages.slice(0, index)], [index]);
  const move = (amount: number) => setIndex((value) => (value + amount + outdoorLivingImages.length) % outdoorLivingImages.length);
  const mainImage = outdoorLivingImages[index];

  return (
    <section id="outdoor-living" className="dark-panel outdoor-showcase" {...interactionProps}>
      <div className="outdoor-showcase__top">
        <div className="outdoor-showcase__main" key={mainImage.src}>
          <Image src={mainImage.src} alt={mainImage.alt} fill unoptimized sizes="(max-width: 780px) calc(100vw - 88px), 44vw" />
        </div>
        <div className="outdoor-showcase__copy">
          <h2>Outdoor Living</h2>
          <p>Create an outdoor area that works better for your home, whether you want more room to entertain, improved access around the property or a practical upgrade to an existing space. Outdoor living projects can range from individual improvements through to larger exterior projects involving several areas of the property.</p>
          <strong>This service can include:</strong>
          <ul>{["Decking", "Patios", "Pergolas", "Retaining walls", "Fencing", "Driveways", "Concrete work"].map((item) => <li key={item}>{item}</li>)}</ul>
          <p>Each project is planned around the property and what you want to achieve with the space. This could mean creating a new entertaining area, improving privacy, making sloped sections more usable or upgrading driveways and access. Where different types of work are required, they can be planned together to create a practical and well-finished outdoor area.</p>
        </div>
      </div>
      <div className="outdoor-showcase__gallery" key={index}>
        {ordered.slice(1, 5).map((item) => <div className="outdoor-showcase__thumb" key={item.src}><Image src={item.src} alt={item.alt} fill unoptimized sizes="(max-width: 780px) calc(100vw - 88px), 23vw" /></div>)}
      </div>
      <div className="outdoor-showcase__controls">
        <div className="slider-dots">{outdoorLivingImages.map((_, dot) => <button key={dot} type="button" aria-label={`Show outdoor project ${dot + 1}`} className={dot === index ? "is-active" : ""} onClick={() => setIndex(dot)} />)}</div>
        <div className="outdoor-showcase__arrows">
          <button type="button" onClick={() => move(-1)} aria-label="Previous outdoor project"><ChevronIcon direction="left" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next outdoor project"><ChevronIcon direction="right" /></button>
        </div>
      </div>
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
