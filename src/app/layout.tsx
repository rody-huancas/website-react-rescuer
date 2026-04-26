import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Providers from "./providers";
import { cn } from "@/utils/cn";
import "@/styles/globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets : ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets : ["latin"],
  weight  : ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title      : "React Rescuer",
  description: "Una herramienta moderna para Error Boundaries: rescata caídas, conserva contexto y entrega UIs más serenas.",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html
    lang="es"
    className={cn(poppins.variable, geistMono.variable, "h-full antialiased rr-preload")}
  >
    <head>
      <style
        dangerouslySetInnerHTML={{
          __html: `@media (prefers-reduced-motion: no-preference) {
            html.rr-preload [data-rr-header] { opacity: 0; visibility: hidden; }
            html.rr-preload [data-rr-hero] [data-rr-stagger-word],
            html.rr-preload [data-rr-hero] [data-rr-fade],
            html.rr-preload [data-rr-hero] [data-rr-code-card],
            html.rr-preload [data-rr-hero] [data-rr-install-card] { opacity: 0; visibility: hidden; }
          }`,
        }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: "window.setTimeout(function(){document.documentElement.classList.remove('rr-preload');},2000);",
        }}
      />
    </head>
    <body className="min-h-full flex flex-col overflow-x-hidden" suppressHydrationWarning>
      <Providers>
        <Header />
       
        <main className="flex-1">
          {children}
        </main>
        
        <Footer />
      </Providers>
    </body>
  </html>
);

export default RootLayout;
