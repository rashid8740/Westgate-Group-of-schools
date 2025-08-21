import type { Metadata } from "next";
import { Inter, Open_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Westgate Group of Schools - Excellence in Education",
  description: "Westgate Group of Schools - A premier educational institution in Nairobi, Kenya, offering Cambridge IGCSE and A-Level programs. Nurturing tomorrow's leaders through excellence in education since 1995.",
  keywords: "Westgate School, Nairobi Schools, Cambridge IGCSE, A-Level, Kenya Education, Private School, International School",
  openGraph: {
    title: "Westgate Group of Schools - Excellence in Education",
    description: "Premier educational institution offering world-class education in Nairobi, Kenya",
    url: "https://westgateschool.ac.ke",
    siteName: "Westgate Group of Schools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Westgate Group of Schools",
    description: "Excellence in Education Since 1995",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${openSans.variable} ${playfair.variable} font-body antialiased`}
        suppressHydrationWarning={true}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
