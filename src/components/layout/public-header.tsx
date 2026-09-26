import Link from "next/link";
import { COMING_SOON } from "@/constants";
import { Brand } from "./brand";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "For recruiters", href: "/#audience" },
  { label: "How it works", href: "/#workflow" },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center gap-10 px-4 sm:px-6 lg:px-8">
        <Brand />
        <nav className="hidden gap-8 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-body hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            className="hidden h-10 px-3 text-sm font-semibold text-body disabled:cursor-not-allowed disabled:opacity-60 sm:inline-flex sm:items-center"
            disabled
            title={COMING_SOON}
          >
            Sign in
          </button>
          <button
            type="button"
            className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            disabled
            title={COMING_SOON}
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  );
}
