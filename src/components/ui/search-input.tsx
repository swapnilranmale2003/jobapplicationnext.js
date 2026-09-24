import type { InputHTMLAttributes } from "react";
import { cn } from "@/utils";
import { Icon } from "./icon";
import styles from "./search-input.module.css";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
  /** Accessible label; defaults to the placeholder. */
  label?: string;
};

export function SearchInput({ className, label, placeholder = "Search…", ...props }: SearchInputProps) {
  return (
    <div className={cn(styles.wrapper, className)}>
      <Icon name="search" size={16} className={styles.icon} />
      <input
        type="search"
        className={styles.input}
        placeholder={placeholder}
        aria-label={label ?? placeholder}
        {...props}
      />
    </div>
  );
}
