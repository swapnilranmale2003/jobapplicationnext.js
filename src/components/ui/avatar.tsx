import { cn } from "@/utils";
import { getInitials } from "@/utils/format";
import styles from "./avatar.module.css";

type AvatarProps = {
  name: string;
  size?: "sm" | "md" | "lg";
  tone?: "blue" | "green" | "purple" | "slate";
};

export function Avatar({ name, size = "md", tone = "blue" }: AvatarProps) {
  return (
    <span className={cn(styles.avatar, styles[size], styles[tone])} aria-hidden>
      {getInitials(name)}
    </span>
  );
}
