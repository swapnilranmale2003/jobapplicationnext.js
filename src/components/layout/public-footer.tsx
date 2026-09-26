import { APP_TAGLINE } from "@/constants";

export function PublicFooter() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto flex w-full max-w-[1100px] flex-col items-center justify-between gap-2 px-4 pt-6 pb-24 text-sm text-muted sm:flex-row sm:pb-6 sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} ApplyWise. All rights reserved.</p>
        <p>{APP_TAGLINE}</p>
      </div>
    </footer>
  );
}
