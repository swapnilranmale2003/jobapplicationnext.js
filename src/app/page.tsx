import { AiFeatures, Hero, PanelOverview, ProblemSolution, Workflow } from "@/components/features/landing";
import { PublicFooter, PublicHeader } from "@/components/layout";

export default function HomePage() {
  return (
    <>
      <PublicHeader />
      <main>
        <Hero />
        <ProblemSolution />
        <AiFeatures />
        <PanelOverview />
        <Workflow />
      </main>
      <PublicFooter />
    </>
  );
}
