import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/utils";
import { Icon, type IconName } from "./icon";
import styles from "./button.module.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
export type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  iconPosition?: "start" | "end";
  fullWidth?: boolean;
  children?: ReactNode;
};

function buttonClassName({
  variant = "primary",
  size = "md",
  fullWidth,
  className,
}: SharedProps & { className?: string }) {
  return cn(styles.button, styles[variant], styles[size], fullWidth && styles.fullWidth, className);
}

function ButtonContent({ icon, iconPosition = "start", size = "md", children }: SharedProps) {
  const iconNode = icon ? <Icon name={icon} size={size === "sm" ? 14 : 16} /> : null;
  return (
    <>
      {iconPosition === "start" && iconNode}
      {children}
      {iconPosition === "end" && iconNode}
    </>
  );
}

type ButtonProps = SharedProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant,
  size,
  icon,
  iconPosition,
  fullWidth,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonClassName({ variant, size, fullWidth, className })}
      {...props}
    >
      <ButtonContent icon={icon} iconPosition={iconPosition} size={size}>
        {children}
      </ButtonContent>
    </button>
  );
}

type LinkButtonProps = SharedProps & Omit<ComponentProps<typeof Link>, "children">;

export function LinkButton({
  variant,
  size,
  icon,
  iconPosition,
  fullWidth,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link className={buttonClassName({ variant, size, fullWidth, className })} {...props}>
      <ButtonContent icon={icon} iconPosition={iconPosition} size={size}>
        {children}
      </ButtonContent>
    </Link>
  );
}
