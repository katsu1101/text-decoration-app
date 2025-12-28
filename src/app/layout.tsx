import ModeNav             from "@/components/ModeNav";
import {siteMeta}          from "@/lib/siteMetadata";
import type {Metadata}     from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import React               from "react";

export const metadata: Metadata = {
  title: {default: siteMeta.name, template: `%s | ${siteMeta.name}`},
  description: siteMeta.description,
  metadataBase: new URL(siteMeta.url),
  keywords: siteMeta.keywords,
  manifest: `${siteMeta.basePath}/manifest.json`,

  // ✅ icons（favicon）
  icons: {
    icon: [
      {url: `${siteMeta.basePath}/favicon-16x16.png`, sizes: "16x16", type: "image/png"},
      {url: `${siteMeta.basePath}/favicon-32x32.png`, sizes: "32x32", type: "image/png"},
    ],
  },

  openGraph: {
    title: siteMeta.name,
    description: siteMeta.description,
    url: siteMeta.url,
    siteName: siteMeta.name,
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: `${siteMeta.basePath}/og-image.png`,
        width: 1200,
        height: 630,
        alt: siteMeta.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@katsu1101",
    creator: "@katsu1101",
    title: siteMeta.name,
    description: siteMeta.description,
    images: ["og-image.png"],
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({children}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <title>{siteMeta.name}</title>
    </head>
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    <ModeNav/>
    {children}
    </body>
    </html>
  );
}
