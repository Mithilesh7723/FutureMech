import Link from "next/link";
import { Container } from "@/components/layout/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <Container className="flex flex-1 flex-col items-center justify-center py-32 text-center">
        <p className="mb-4 text-[0.75rem] font-medium uppercase tracking-[0.14em] text-bronze">
          404
        </p>
        <h1 className="mb-4 font-serif text-[2.5rem] text-ink">
          Page Not Found
        </h1>
        <p className="mb-8 max-w-[400px] text-[1.0625rem] text-stone">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-xl bg-ink px-7 py-3 text-[0.9375rem] font-medium text-white-pure transition-all duration-200 hover:bg-graphite"
        >
          Back to Home
        </Link>
      </Container>
    </div>
  );
}
