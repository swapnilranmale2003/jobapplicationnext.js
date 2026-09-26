import Link from "next/link";
import { ROUTES } from "@/constants";
import { cn } from "@/utils";
import { BrandMark } from "./brand-mark";

type BrandProps = {
  href?: string;
  /** Use "inverse" on dark backgrounds. */
  tone?: "default" | "inverse";
};

/** ApplyWise logo: monogram + wordmark. */
export function Brand({ href = ROUTES.HOME, tone = "default" }: BrandProps) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 whitespace-nowrap" aria-label="ApplyWise home">
      <BrandMark inverse={tone === "inverse"} />
      <span
        className={cn(
          "text-[1.1875rem] font-bold tracking-[-0.02em]",
          tone === "inverse" ? "text-white" : "text-navy",
        )}
        aria-hidden
      >
        ApplyWise
      </span>
    </Link>
  );
}
