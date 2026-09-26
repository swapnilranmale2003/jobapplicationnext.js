import { FEATURES } from "@/constants";
import { container, sectionLabel, sectionTitle } from "./styles";

export function Features() {
  return (
    <section id="features" className="scroll-mt-16 bg-white py-16 md:py-20">
      <div className={container}>
        <p className={sectionLabel}>Features</p>
        <h2 className={sectionTitle}>Everything you need to apply smarter</h2>

        <div className="mt-10 grid border-t border-line md:grid-cols-3">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.title}
              className="border-b border-line py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
            >
              <span className="text-sm font-semibold tabular-nums text-muted">0{index + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="mt-1.5 text-body">{feature.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
