import { Audience, CtaBanner, Features, Hero, Workflow } from "@/components/features/landing";
import { PublicFooter, PublicHeader } from "@/components/layout";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <Hero />
        <Features />
        <Audience />
        <Workflow />
        <CtaBanner />
      </main>
      <PublicFooter />
    </>
  );
}
