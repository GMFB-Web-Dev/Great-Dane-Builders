import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" aria-label="Great Dane Builders home" className={`brand-logo ${className}`}>
      <Image src="/assets/gdb-logo.png" alt="Great Dane Builders" width={500} height={500} priority />
    </Link>
  );
}

export function VanLink({ href, children, variant = "light", external = false }: { href: string; children: React.ReactNode; variant?: "light" | "dark"; external?: boolean }) {
  const content = <><Image src={variant === "light" ? "/assets/van-light.png" : "/assets/van-dark.png"} alt="" width={2172} height={724} /><span>{children}</span></>;
  if (external) return <a className={`van-link van-link--${variant}`} href={href} target="_blank" rel="noreferrer">{content}</a>;
  return <Link className={`van-link van-link--${variant}`} href={href}>{content}</Link>;
}
