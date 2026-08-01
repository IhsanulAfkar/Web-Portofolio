import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import "../globals.css";
import Providers from "@/providers";
import { Navbar1 } from "@/components/ui/navbar1";
import { getDictionary } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Web Portofolio",
  description: "Web Portofolio",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  const dict = getDictionary(lang as "en" | "id")
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-background relative">
        <Providers>
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
            <div className="animate-grid absolute inset-[-200%] opacity-30" />
          </div>

          <Navbar1 dict={dict} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
