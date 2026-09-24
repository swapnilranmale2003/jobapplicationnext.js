import Link from "next/link";
import { APP_SHORT_NAME, ROUTES } from "@/constants";
import { Icon } from "@/components/ui";
import styles from "./brand.module.css";

export function Brand({ href = ROUTES.HOME }: { href?: string }) {
  return (
    <Link href={href} className={styles.brand}>
      <span className={styles.mark}>
        <Icon name="sparkles" size={18} />
      </span>
      <span className={styles.name}>{APP_SHORT_NAME}</span>
    </Link>
  );
}
