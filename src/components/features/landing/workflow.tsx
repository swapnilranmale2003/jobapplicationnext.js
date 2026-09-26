import { WORKFLOW_STEPS } from "@/constants";
import { container, sectionLabel, sectionTitle } from "./styles";

export function Workflow() {
  return (
    <section id="workflow" className="scroll-mt-16 bg-white py-16 md:py-20">
      <div className={container}>
        <p className={sectionLabel}>How it works</p>
        <h2 className={sectionTitle}>From resume to offer in four steps</h2>

        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {WORKFLOW_STEPS.map((step, index) => (
            <li key={step.title} className="border-t-2 border-navy pt-5">
              <span className="text-sm font-semibold tabular-nums text-brand">Step {index + 1}</span>
              <h3 className="mt-2 text-base font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-body">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
