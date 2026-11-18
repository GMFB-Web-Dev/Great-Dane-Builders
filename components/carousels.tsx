"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState, type FocusEvent } from "react";
import { galleryImages, googleReviewsUrl, services, testimonials } from "@/lib/site-data";
import { ChevronIcon, InlineArrowIcon } from "./icons";
import { photos } from "@/lib/image-assets";

const outdoorLivingImages = [
  { src: photos.outdoorPlanter, alt: "New timber fence and raised planter beside a landscaped lawn" },
  { src: photos.outdoorRetaining, alt: "Timber retaining wall and garden area under construction" },
  { src: photos.outdoorDeck, alt: "Finished timber deck and outdoor seating area" },
  { src: photos.outdoorPath, alt: "Landscaped garden path with stone pavers" },
  { src: photos.outdoorLiving, alt: "Finished timber fence and lawn" },
  { src: photos.outdoorPorch, alt: "Villa porch and garden bed under restoration" },
  { src: photos.outdoorRedDeck, alt: "Newly built timber deck behind a home" },
  { src: photos.outdoorVilla, alt: "Villa exterior with new retaining work" },
] as const;

const outdoorLivingMainImage = outdoorLivingImages[0];
const outdoorLivingGalleryImages = outdoorLivingImages.slice(1);

const newBuildImages = [
  { src: photos.newBuildWrapped, alt: "New home framing wrapped and ready for exterior cladding" },
  { src: photos.newBuildCabin, alt: "New timber-clad home nearing completion" },
  { src: photos.galleryBathroom, alt: "Completed bathroom with twin concrete basins" },
  { src: photos.galleryAerial, alt: "New home framing viewed from above" },
  { src: photos.newBuild, alt: "New home structural framing under construction" },
  { src: photos.heroServices, alt: "Completed kitchen in a newly built home" },
  { src: photos.galleryWindow, alt: "Completed bathroom window and vanity" },
  { src: photos.galleryVilla, alt: "Completed character home exterior" },
] as const;

function Arrows({ onPrev, onNext, label }: { onPrev: () => void; onNext: () => void; label: string }) {
  return <><button className="carousel-arrow carousel-arrow--prev" type="button" onClick={onPrev} aria-label={`Previous ${label}`}><ChevronIcon direction="left" /></button><button className="carousel-arrow carousel-arrow--next" type="button" onClick={onNext} aria-label={`Next ${label}`}><ChevronIcon direction="right" /></button></>;
}

function CarouselDots({ labels, index, onSelect }: { labels: string[]; index: number; onSelect: (index: number) => void }) {
  return <div className="slider-dots">{labels.map((label, dot) => <button key={label} type="button" aria-label={label} aria-current={dot === index ? "true" : undefined} className={dot === index ? "is-active" : ""} onClick={() => onSelect(dot)} />)}</div>;
}

const CAROUSEL_INTERVAL_MS = 5000;

function useAutoCarousel(length: number) {
  const carouselRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [keyboardFocused, setKeyboardFocused] = useState(false);

  useEffect(() => {
    if (!carouselRef.current || keyboardFocused || length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const carousels = Array.from(document.querySelectorAll("[data-autoplay-carousel]"));
    const position = Math.max(0, carousels.indexOf(carouselRef.current));
    const phase = (position % 2) * (CAROUSEL_INTERVAL_MS / 2);
    let timer: number;

    // A shared clock keeps alternating sections staggered, including after a pause.
    const scheduleNext = () => {
      const elapsed = ((performance.now() - phase) % CAROUSEL_INTERVAL_MS + CAROUSEL_INTERVAL_MS) % CAROUSEL_INTERVAL_MS;
      const delay = Math.ceil(CAROUSEL_INTERVAL_MS - elapsed);
      timer = window.setTimeout(() => {
        setIndex((value) => (value + 1) % length);
        scheduleNext();
      }, delay);
    };

    scheduleNext();
    return () => window.clearTimeout(timer);
  }, [length, keyboardFocused]);

  return {
    index,
    setIndex,
    interactionProps: {
      ref: carouselRef,
      "data-autoplay-carousel": true,
      onFocusCapture: (event: FocusEvent<HTMLElement>) => setKeyboardFocused(event.target.matches(":focus-visible")),
      onBlurCapture: () => setKeyboardFocused(false),
    },
  };
}

export function ServicesCarousel() {
  const { index, setIndex, interactionProps } = useAutoCarousel(services.length);
  const ordered = useMemo(() => [...services.slice(index), ...services.slice(0, index)], [index]);
  const move = (amount: number) => setIndex((value) => (value + amount + services.length) % services.length);
  return (
    <section className="dark-panel services-carousel" {...interactionProps}>
      <h2>Your Home. Our Expertise.</h2>
      <div className="carousel-stage services-stage">
        <div className="service-cards" key={index}>
          {ordered.slice(0, 3).map((service) => <Link className="service-card" href={service.href} key={service.title}><Image className="service-card__image" src={service.image} alt="" fill quality={85} placeholder="blur" sizes="(max-width: 780px) 82vw, 29vw" /><span className="card-shade" /><strong>{service.title}</strong><span className="service-card__learn-more"><span>Learn more</span><InlineArrowIcon /></span></Link>)}
        </div>
        <Arrows onPrev={() => move(-1)} onNext={() => move(1)} label="service" />
      </div>
      <div className="slider-controls"><CarouselDots labels={services.map((service) => `Show service: ${service.title}`)} index={index} onSelect={setIndex} /></div>
    </section>
  );
}

export function OutdoorLivingShowcase() {
  const { index, setIndex, interactionProps } = useAutoCarousel(outdoorLivingGalleryImages.length);
  const ordered = useMemo(() => [...outdoorLivingGalleryImages.slice(index), ...outdoorLivingGalleryImages.slice(0, index)], [index]);
  const move = (amount: number) => setIndex((value) => (value + amount + outdoorLivingGalleryImages.length) % outdoorLivingGalleryImages.length);

  return (
    <section id="outdoor-living" className="dark-panel outdoor-showcase" {...interactionProps}>
      <div className="outdoor-showcase__top">
        <div className="outdoor-showcase__main">
          <Image src={outdoorLivingMainImage.src} alt={outdoorLivingMainImage.alt} fill quality={85} placeholder="blur" sizes="(max-width: 780px) calc(100vw - 44px), 44vw" />
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
        {ordered.slice(0, 4).map((item) => <div className="outdoor-showcase__thumb" key={item.src.src}><Image src={item.src} alt={item.alt} fill quality={85} placeholder="blur" sizes="(max-width: 780px) calc(100vw - 44px), max(230px, calc((100vw - 194px) / 4))" /></div>)}
      </div>
      <div className="outdoor-showcase__controls">
        <CarouselDots labels={outdoorLivingGalleryImages.map((_, dot) => `Show outdoor project ${dot + 1}`)} index={index} onSelect={setIndex} />
        <div className="outdoor-showcase__arrows">
          <button type="button" onClick={() => move(-1)} aria-label="Previous outdoor project"><ChevronIcon direction="left" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next outdoor project"><ChevronIcon direction="right" /></button>
        </div>
      </div>
    </section>
  );
}

export function NewBuildsShowcase() {
  const { index, setIndex, interactionProps } = useAutoCarousel(newBuildImages.length);
  const ordered = useMemo(() => [...newBuildImages.slice(index), ...newBuildImages.slice(0, index)], [index]);
  const move = (amount: number) => setIndex((value) => (value + amount + newBuildImages.length) % newBuildImages.length);

  return (
    <section id="new-builds" className="new-build-showcase" aria-labelledby="new-builds-title" {...interactionProps}>
      <div className="new-build-showcase__top">
        <div className="new-build-showcase__copy">
          <h2 id="new-builds-title">New builds</h2>
          <div className="title-rule title-rule--dark" />
          <p>A new build gives you the opportunity to create a home around your plans, property and the way you want to live. From the initial building stages through to completion, the work can be managed across the different elements required to turn approved plans into a finished home.</p>
          <strong>This service can include:</strong>
          <ul>{["Residential new home construction", "Site preparation and foundations", "Structural building and framing", "Interior and exterior building work", "Coordination of required sub-trades", "Construction through to completion"].map((item) => <li key={item}>{item}</li>)}</ul>
          <p>New build projects involve many moving parts, from structural work and materials through to plumbing, electrical and finishing trades. Each stage is coordinated in line with the plans and project requirements, helping keep the different areas of construction organised as the home progresses from the ground up.</p>
        </div>
        <div className="new-build-showcase__main">
          <Image src={photos.newBuild} alt="New home structural framing under construction" fill quality={85} placeholder="blur" sizes="(max-width: 780px) calc(100vw - 44px), 48vw" />
        </div>
      </div>
      <div id="new-builds-gallery" className="new-build-showcase__gallery" key={index}>
        {ordered.slice(0, 4).map((item) => <div className="new-build-showcase__thumb" key={item.src.src}><Image src={item.src} alt={item.alt} fill quality={85} placeholder="blur" sizes="(max-width: 780px) calc(100vw - 44px), (max-width: 1000px) 280px, 28vw" /></div>)}
      </div>
      <div className="new-build-showcase__controls">
        <CarouselDots labels={newBuildImages.map((_, dot) => `Show new build project ${dot + 1}`)} index={index} onSelect={setIndex} />
        <div className="new-build-showcase__arrows">
          <button type="button" onClick={() => move(-1)} aria-label="Previous new build project"><ChevronIcon direction="left" /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next new build project"><ChevronIcon direction="right" /></button>
        </div>
      </div>
    </section>
  );
}

export function Gallery({ images = galleryImages, title = "Our Work", dark = true }: { images?: typeof galleryImages; title?: string; dark?: boolean }) {
  const { index, setIndex, interactionProps } = useAutoCarousel(images.length);
  const ordered = useMemo(() => [...images.slice(index), ...images.slice(0, index)], [images, index]);
  const move = (amount: number) => setIndex((value) => (value + amount + images.length) % images.length);
  return (
    <section className={`${dark ? "dark-panel" : ""} gallery-section`} {...interactionProps}>
      <h2>{title}</h2>
      <div className="carousel-stage gallery-stage"><div className="gallery-viewport"><div className="gallery-track" key={index}>{ordered.slice(0, 4).map((item, i) => <div className="gallery-image" key={`${item.src.src}-${i}`}><Image src={item.src} alt={item.alt} fill quality={85} placeholder="blur" sizes="(max-width: 780px) calc(100vw - 44px), (max-width: 1000px) 300px, 28vw" /></div>)}</div></div><Arrows onPrev={() => move(-1)} onNext={() => move(1)} label="gallery image" /></div>
      <div className="slider-controls"><CarouselDots labels={images.map((_, dot) => `Show image ${dot + 1}`)} index={index} onSelect={setIndex} /></div>
    </section>
  );
}

export function Testimonials() {
  const { index, setIndex, interactionProps } = useAutoCarousel(testimonials.length);
  const move = (amount: number) => setIndex((value) => (value + amount + testimonials.length) % testimonials.length);
  const current = testimonials[index];
  return (
    <section className="dark-panel testimonial-section" {...interactionProps}>
      <h2>Trusted By Our Clients</h2>
      <div className="testimonial-row">
        <button className="carousel-arrow testimonial-arrow" type="button" onClick={() => move(-1)} aria-label="Previous testimonial"><ChevronIcon direction="left" /></button>
        <blockquote key={index}><p>{current.quote}</p><cite>{current.name}</cite></blockquote>
        <button className="carousel-arrow testimonial-arrow" type="button" onClick={() => move(1)} aria-label="Next testimonial"><ChevronIcon direction="right" /></button>
      </div>
      <CarouselDots labels={testimonials.map((_, dot) => `Show testimonial ${dot + 1}`)} index={index} onSelect={setIndex} />
      <a className="testimonial-source" href={googleReviewsUrl} target="_blank" rel="noreferrer">Read the full reviews on Google</a>
    </section>
  );
}
