import type { Metadata } from "next";
import type { Viewport } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Providers from "./providers";
import envConfig from "@/config/env.config";
import { cn } from "@/utils/cn";
import { createMetadata, JsonLd, softwareSourceCodeJsonLd, websiteJsonLd } from "@/seo";
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
  ...createMetadata({
    title   : "React Rescuer",
    path    : "/",
    keywords: [
      "react error boundary",
      "react error boundaries",
      "error boundary react",
      "manejo de errores react",
      "react error handling",
      "react developer tools",
      "error recovery react",
      "fallback ui",
      "observabilidad react",
      "react-rescuer",
    ],
  }),
  verification: envConfig.googleSiteVerification ? { google: envConfig.googleSiteVerification } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0d0d0d",
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
      <JsonLd data={[websiteJsonLd(), softwareSourceCodeJsonLd()]} />
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
