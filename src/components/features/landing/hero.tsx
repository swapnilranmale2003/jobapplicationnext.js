import { HERO } from "@/constants";
import { CheckIcon } from "./check-icon";
import { ProductPreview } from "./product-preview";
import { container } from "./styles";

export function Hero() {
  return (
    <section className="border-b border-line bg-white">
      <div className={`${container} grid items-center gap-12 py-16 md:py-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-24`}>
        <div>
          <p className="text-sm font-semibold text-brand">{HERO.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-[-0.025em] text-navy sm:text-5xl sm:leading-[1.08]">
            {HERO.title}
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-body sm:text-lg">{HERO.description}</p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {HERO.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2 text-sm font-medium text-ink">
                <CheckIcon className="size-4 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <ProductPreview />
      </div>
    </section>
  );
}
