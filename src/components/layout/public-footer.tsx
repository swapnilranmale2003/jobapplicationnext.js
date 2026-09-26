import Link from "next/link";
import { APP_TAGLINE } from "@/constants";
import { Brand } from "./brand";

const LINKS = [
  { label: "Features", href: "/#features" },
  { label: "For recruiters", href: "/#audience" },
  { label: "How it works", href: "/#workflow" },
];

export function PublicFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-4 py-10 sm:px-6 md:flex-row md:items-start md:justify-between lg:px-8">
        <div>
          <Brand />
          <p className="mt-3 text-sm text-muted">{APP_TAGLINE}</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-body hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto w-full max-w-[1200px] px-4 py-5 text-xs text-muted sm:px-6 lg:px-8">
          © {new Date().getFullYear()} ApplyWise. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
