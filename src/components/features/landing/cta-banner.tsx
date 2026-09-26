import { COMING_SOON } from "@/constants";
import { container } from "./styles";

export function CtaBanner() {
  return (
    <section className="bg-navy">
      <div className={`${container} flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center`}>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-white">Ready to apply smarter?</h2>
          <p className="mt-1 text-slate-300">Create your free account in under a minute.</p>
        </div>
        <button
          type="button"
          className="inline-flex h-11 items-center rounded-md bg-white px-5 text-sm font-semibold text-navy disabled:cursor-not-allowed disabled:opacity-60"
          disabled
          title={COMING_SOON}
        >
          Get started
        </button>
      </div>
    </section>
  );
}
