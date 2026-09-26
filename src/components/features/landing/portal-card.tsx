import Link from "next/link";
import { Icon } from "@/components/ui";
import { COMING_SOON, PORTALS, PORTALS_ENABLED, ROLE_PANELS } from "@/constants";
import { cn } from "@/utils";

type Portal = (typeof PORTALS)[number];

const ACCENT: Record<Portal["role"], { icon: string; button: string; hover: string }> = {
  seeker: { icon: "bg-blue-50 text-blue-700", button: "bg-blue-700", hover: "hover:bg-blue-800" },
  recruiter: { icon: "bg-emerald-50 text-emerald-700", button: "bg-emerald-700", hover: "hover:bg-emerald-800" },
  admin: { icon: "bg-violet-50 text-violet-700", button: "bg-violet-700", hover: "hover:bg-violet-800" },
};

const buttonClass =
  "mt-8 inline-flex h-11 w-full items-center justify-center gap-2 rounded-md text-sm font-semibold text-white transition-colors";

export function PortalCard({ portal }: { portal: Portal }) {
  const accent = ACCENT[portal.role];
  const label = (
    <>
      Enter portal
      <Icon name="arrowRight" size={16} />
    </>
  );

  return (
    <article className="flex flex-col rounded-xl border border-line bg-white p-6 shadow-[0_1px_2px_rgb(15_23_42/0.04)] sm:p-7">
      <span className={cn("grid size-12 place-items-center rounded-lg", accent.icon)}>
        <Icon name={portal.icon} size={22} />
      </span>
      <h2 className="mt-5 text-lg font-semibold text-ink">{portal.title}</h2>
      <p className="mt-1.5 flex-1 text-sm leading-relaxed text-body">{portal.description}</p>

      {PORTALS_ENABLED ? (
        <Link href={ROLE_PANELS[portal.role].nav[0].href} className={cn(buttonClass, accent.button, accent.hover)}>
          {label}
        </Link>
      ) : (
        <button
          type="button"
          className={cn(buttonClass, accent.button, "cursor-not-allowed opacity-50")}
          disabled
          title={COMING_SOON}
        >
          {label}
        </button>
      )}
    </article>
  );
}
