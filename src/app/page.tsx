import { AiFeatures, Audience, CtaBanner, Hero, Workflow } from "@/components/features/landing";
import { PublicFooter, PublicHeader } from "@/components/layout";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <Hero />
        <AiFeatures />
        <Audience />
        <Workflow />
        <CtaBanner />
      </main>
      <PublicFooter />
    </>
  );
}
