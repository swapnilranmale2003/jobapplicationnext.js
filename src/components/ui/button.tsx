import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils";
import styles from "./button.module.css";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(styles.button, className)} {...props} />;
}
