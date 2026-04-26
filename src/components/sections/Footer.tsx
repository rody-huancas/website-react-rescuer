import Link from "next/link";
import Container from "@/components/ui/Container";

const Footer = () => (
  <footer className="border-t border-white/8 bg-black/30 mt-10">
    <Container className="py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mt-1 text-xs text-white/50">
            Desarrollado por{" "}
            <a
              href="https://rody-huancas.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-white hover:text-(--rr-accent)"
            >
              Rody Huancas
            </a>
          </p>
        </div>

        <nav className="flex flex-wrap items-center gap-3 text-xs text-white/65">
          <Link href="/docs" className="hover:text-white">
            Docs
          </Link>

          <a
            href="https://www.npmjs.com/package/react-rescuer"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            npm
          </a>
          
          <a
            href="https://github.com/rody-huancas/react-rescuer"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
        </nav>
      </div>
    </Container>
  </footer>
);

export default Footer;
