import { APP_NAME } from "@/constants";
import { Brand } from "./brand";
import styles from "./public-footer.module.css";

export function PublicFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <Brand />
        <p className={styles.copy}>
          © {new Date().getFullYear()} {APP_NAME}
        </p>
      </div>
    </footer>
  );
}
