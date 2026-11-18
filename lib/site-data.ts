import { artwork, photos } from "./image-assets";

export const contact = {
  phoneDisplay: "021 970 066",
  phoneHref: "tel:+6421970066",
  email: "dane@gdb.co.nz",
  secondaryEmail: "pat@gdb.co.nz",
  facebook: "https://www.facebook.com/p/Great-Dane-Builders-LTD-61576536329481/",
  instagram: "https://www.instagram.com/great_dane_builders/",
  map: "https://www.google.com/maps/search/?api=1&query=Auckland%2C%20New%20Zealand",
  mapEmbed: "https://www.google.com/maps?q=Auckland%2C%20New%20Zealand&output=embed",
  mapLabel: "Auckland, New Zealand",
  address: "26 Hinemoa Street, Birkenhead, Auckland 0626",
};

export const services = [
  { title: "Outdoor Living", href: "/services#outdoor-living", image: photos.outdoorLiving },
  { title: "Renovations, Additions & Alterations", href: "/services#renovations", image: photos.heroRenovations },
  { title: "New Builds", href: "/services#new-builds", image: photos.heroServices },
  { title: "Project Management", href: "/services#project-management", image: photos.projectManagement },
];

export const galleryImages = [
  { src: photos.galleryFence, alt: "Finished timber fence and garden edging" },
  { src: photos.galleryKitchen, alt: "Renovated dark kitchen" },
  { src: photos.heroServices, alt: "Completed modern kitchen" },
  { src: photos.galleryWindow, alt: "Detailed interior window renovation" },
  { src: photos.galleryBathroom, alt: "Completed bathroom joinery" },
  { src: photos.galleryVilla, alt: "Character villa restoration" },
  { src: photos.galleryAerial, alt: "New build framing from above" },
];

export const renovationGalleryImages = [
  galleryImages[5],
  galleryImages[0],
  { src: photos.heroRenovations, alt: "Finished renovation detail" },
  { src: photos.alterations, alt: "Addition framing in progress" },
  ...galleryImages.slice(1, 4),
];

export const values = [
  { title: "Trust", icon: artwork.trust, text: "We keep you informed with clear communication, openness on site and dependable follow-through, so you know what’s happening at every stage of your build." },
  { title: "Flexibility", icon: artwork.flexibility, text: "Every project is different. We listen, respond to changing needs and adapt our approach to work around your priorities and the requirements of the job." },
  { title: "Quality", icon: artwork.quality, text: "We take pride in strong workmanship, tidy sites and attention to detail. From preparation to finishing touches, we do the job properly, without shortcuts." },
  { title: "Confidence", icon: artwork.confidence, text: "With strong financial management, a commitment to compliance and organised project oversight, we provide a reliable foundation for your building project." },
  { title: "Practicality", icon: artwork.practicality, text: "When challenges arise, we assess the options, explain the choices and find practical ways forward that keep your project moving and your goals in focus." },
];

export const googleReviewsUrl = "https://www.google.com/maps/place/Great+Dane+Builders+LTD/@-36.52411,173.5831902,8z/data=!4m8!3m7!1s0x20e50df38bdea9e1:0x8b16677029fb1022!8m2!3d-36.5313753!4d174.9024663!9m1!1b1!16s%2Fg%2F11ygpd3980";

// Short excerpts from the six Google reviews verified on 18 November 2026.
export const testimonials = [
  { quote: "Our builders for over 6 years and multiple projects. Couldn’t rate them more highly.", name: "Toni Beattie" },
  { quote: "Dane and his team have been amazing. Transformed my house into a work of art…", name: "Natalie McMillin" },
  { quote: "Dane was amazing at project managing our kitchen, bathroom and exterior upgrade.", name: "Janel Reid" },
  { quote: "Great communication throughout the process. Highly recommend for all your building needs. Would use again.", name: "Nick Cory" },
  { quote: "They're super professional, easy going, and gave me peace of mind. I can't recommend these guys enough.", name: "Katrina Wass" },
  { quote: "…top workmanship, great guy with a eye to detail & great ideas with great chat aswell Highly recommend!!", name: "Marc Woolley" },
];
