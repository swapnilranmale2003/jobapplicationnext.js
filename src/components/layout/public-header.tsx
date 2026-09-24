import Link from "next/link";
import { Button } from "@/components/ui";
import { COMING_SOON } from "@/constants";
import { Brand } from "./brand";
import styles from "./public-header.module.css";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "For recruiters", href: "/#audience" },
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
          <Button variant="ghost" className={styles.signIn} disabled title={COMING_SOON}>
            Sign in
          </Button>
          <Button disabled title={COMING_SOON}>
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
