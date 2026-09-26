import { PortalSelection } from "@/components/features/landing";
import { PublicFooter, PublicHeader } from "@/components/layout";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-canvas">
      <PublicHeader />
      <main className="flex flex-1 items-center">
        <PortalSelection />
      </main>
      <PublicFooter />
    </div>
  );
}
