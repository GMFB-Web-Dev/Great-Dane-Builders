import Image from "next/image";
import Link from "next/link";
import { artwork } from "@/lib/image-assets";

export function Logo({ className = "", onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link href="/" aria-label="Great Dane Builders home" className={`brand-logo ${className}`} onClick={onClick}>
      <svg viewBox="0 120 500 190" role="img" aria-label="Great Dane Builders" className="brand-logo__artwork">
        <image href={artwork.logo.src} width="500" height="500" />
      </svg>
    </Link>
  );
}

export function VanArtwork({ variant = "light" }: { variant?: "light" | "dark" }) {
  return <>
    <i className="van-link__fill" aria-hidden="true" />
    <Image className={`van-link__outline van-link__outline--${variant}`} src={artwork.van} alt="" width={768} height={256} unoptimized />
  </>;
}

export function VanLink({ href, children, variant = "light", external = false }: { href: string; children: React.ReactNode; variant?: "light" | "dark"; external?: boolean }) {
  const hasCompactLabel = typeof children === "string" && children.trim().length > 8;
  const content = <>
    <VanArtwork variant={variant} />
    <span className={`van-link__label${hasCompactLabel ? " van-link__label--compact" : ""}`}>{children}</span>
  </>;
  if (external) return <a className={`van-link van-link--${variant}`} href={href} target="_blank" rel="noreferrer">{content}</a>;
  return <Link className={`van-link van-link--${variant}`} href={href}>{content}</Link>;
}
