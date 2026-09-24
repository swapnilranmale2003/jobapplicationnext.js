import Link from "next/link";
import { LinkButton } from "@/components/ui";
import { ROUTES } from "@/constants";
import { Brand } from "./brand";
import styles from "./public-header.module.css";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Panels", href: "/#panels" },
  { label: "How it works", href: "/#workflow" },
];

export function PublicHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Brand />
        <nav className={styles.nav} aria-label="Primary">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={styles.link}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className={styles.actions}>
          <LinkButton href={ROUTES.LOGIN} variant="ghost" className={styles.signIn}>
            Sign in
          </LinkButton>
          <LinkButton href={ROUTES.REGISTER}>Get started</LinkButton>
        </div>
      </div>
    </header>
  );
}
