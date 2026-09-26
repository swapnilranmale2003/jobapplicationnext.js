import { PORTAL_INTRO, PORTALS } from "@/constants";
import { PortalCard } from "./portal-card";

export function PortalSelection() {
  return (
    <section className="mx-auto w-full max-w-[1100px] px-4 py-14 sm:px-6 md:py-20 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-[-0.02em] text-navy sm:text-4xl">{PORTAL_INTRO.title}</h1>
        <p className="mt-3 text-base text-body">{PORTAL_INTRO.description}</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {PORTALS.map((portal) => (
          <PortalCard key={portal.role} portal={portal} />
        ))}
      </div>
    </section>
  );
}
