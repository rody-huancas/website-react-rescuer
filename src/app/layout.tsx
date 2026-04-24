import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import Header from "@/components/sections/Header";
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
    className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
  >
    <body className="min-h-full flex flex-col overflow-x-hidden">
      <Header />
      
      <main className="flex-1">
        {children}
      </main>
    </body>
  </html>
);

export default RootLayout;
