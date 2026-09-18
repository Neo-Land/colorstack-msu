import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./Navbar";
import { cn } from "@/lib/utils";
import { Inter, Geist } from "next/font/google";
import { absoluteUrl, siteConfig, siteUrl } from "./seo";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "ColorStack Montclair State",
    "ColorStack MSU",
    "Montclair State ColorStack",
    "Black CS students",
    "Latinx CS students",
    "Black computer science students",
    "Latinx computer science students",
    "Montclair State University",
    "Montclair State School of Computing",
    "Montclair State student organization",
    "Hispanic-Serving Institution",
    "computer science diversity",
    "diversity in tech",
    "tech careers",
    "career mentorship",
    "Montclair NJ",
    "Red Hawks in tech",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: siteConfig.logo,
    shortcut: siteConfig.logo,
    apple: siteConfig.logo,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    url: "/",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: absoluteUrl(siteConfig.ogImage),
        width: 1400,
        height: 900,
        alt: "ColorStack at Montclair State",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.ogImage)],
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", inter.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col bg-[#f7f8fb]" suppressHydrationWarning>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
