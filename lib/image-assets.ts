import alterations from "@/public/assets/alterations.jpg";
import galleryAerial from "@/public/assets/gallery-aerial.jpg";
import galleryBathroom from "@/public/assets/gallery-bathroom.png";
import galleryFence from "@/public/assets/gallery-fence.png";
import galleryKitchen from "@/public/assets/gallery-kitchen.png";
import galleryVilla from "@/public/assets/gallery-villa.jpg";
import galleryWindow from "@/public/assets/gallery-window.png";
import heroAbout from "@/public/assets/hero-about.jpg";
import heroContact from "@/public/assets/hero-contact-build.jpg";
import heroHome from "@/public/assets/hero-home.jpg";
import heroRenovations from "@/public/assets/hero-renovations.png";
import heroServices from "@/public/assets/hero-services.png";
import newBuildCabin from "@/public/assets/new-build-gallery-cabin.png";
import newBuildWrapped from "@/public/assets/new-build-gallery-wrapped.png";
import outdoorPath from "@/public/assets/outdoor-path.jpg";
import outdoorPlanter from "@/public/assets/outdoor-planter.jpg";
import outdoorPorch from "@/public/assets/outdoor-porch.jpg";
import outdoorRetaining from "@/public/assets/outdoor-retaining.jpg";
import projectManagement from "@/public/assets/project-management.png";
import renovations from "@/public/assets/renovations.png";
import villa from "@/public/assets/villa.png";
import logo from "@/public/assets/optimized/gdb-logo.webp";
import van from "@/public/assets/optimized/van-dark.webp";
import lbp from "@/public/assets/optimized/lbp-logo.webp";
import trust from "@/public/assets/optimized/value-trust.webp";
import flexibility from "@/public/assets/optimized/value-flexibility.webp";
import quality from "@/public/assets/optimized/value-quality.webp";
import confidence from "@/public/assets/optimized/value-confidence.webp";
import practicality from "@/public/assets/optimized/value-practicality.webp";

// Static imports give Vercel content-hashed URLs and immutable image caching.
// Reuse identical photos so different sections share the same cached image.
export const photos = {
  alterations, galleryAerial, galleryBathroom, galleryFence, galleryKitchen,
  galleryVilla, galleryWindow, heroAbout, heroContact, heroHome,
  heroRenovations, heroServices, newBuildCabin, newBuildWrapped,
  outdoorPath, outdoorPlanter, outdoorPorch, outdoorRetaining,
  projectManagement, renovations, villa,
  outdoorLiving: galleryFence,
  outdoorDeck: heroAbout,
  outdoorRedDeck: heroHome,
  outdoorVilla: galleryVilla,
  newBuild: heroContact,
};

export const artwork = { logo, van, lbp, trust, flexibility, quality, confidence, practicality };
