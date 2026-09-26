import { AUDIENCES, COMING_SOON } from "@/constants";
import { CheckIcon } from "./check-icon";
import { buttonOutline, container, sectionLabel, sectionTitle } from "./styles";

export function Audience() {
  return (
    <section id="audience" className="scroll-mt-16 border-y border-line bg-canvas py-16 md:py-20">
      <div className={container}>
        <p className={sectionLabel}>Who it&apos;s for</p>
        <h2 className={sectionTitle}>Built for both sides of hiring</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {AUDIENCES.map((audience) => (
            <article key={audience.key} className="flex flex-col rounded-lg border border-line bg-white p-6 sm:p-8">
              <p className="text-sm font-semibold text-muted">{audience.label}</p>
              <h3 className="mt-1 text-xl font-semibold text-ink">{audience.title}</h3>
              <ul className="mt-5 space-y-3">
                {audience.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-body">
                    <CheckIcon className="size-4 shrink-0 text-emerald-600" />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button type="button" className={buttonOutline} disabled title={COMING_SOON}>
                  {audience.cta}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
