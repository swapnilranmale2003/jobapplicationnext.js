import Link from "next/link";
import { Container } from "@/components/layout";
import { ROUTES } from "@/constants";

export default function NotFound() {
  return (
    <main>
      <Container>
        <h1>Page not found</h1>
        <Link href={ROUTES.HOME}>Go back home</Link>
      </Container>
    </main>
  );
}
