import { APP_TAGLINE } from "@/constants";
import { Brand } from "./brand";

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1100px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Brand />
        <span className="hidden text-sm font-medium text-muted sm:inline">{APP_TAGLINE}</span>
      </div>
    </header>
  );
}
