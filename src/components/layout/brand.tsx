import Link from "next/link";
import { ROUTES } from "@/constants";
import { Icon } from "@/components/ui";
import { cn } from "@/utils";
import styles from "./brand.module.css";

type BrandProps = {
  href?: string;
  /** Use "inverse" on dark backgrounds. */
  tone?: "default" | "inverse";
};

/** ApplyWise wordmark logo. */
export function Brand({ href = ROUTES.HOME, tone = "default" }: BrandProps) {
  return (
    <Link href={href} className={cn(styles.brand, tone === "inverse" && styles.inverse)} aria-label="ApplyWise home">
      <span className={styles.mark} aria-hidden>
        <Icon name="sparkles" size={16} />
      </span>
      <span className={styles.wordmark} aria-hidden>
        Apply<span className={styles.accent}>Wise</span>
      </span>
    </Link>
  );
}
