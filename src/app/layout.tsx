import ModeNav                   from "@/components/ModeNav";
import {siteMeta}                from "@/lib/siteMetadata";
import type {Metadata, Viewport} from "next";
import {Geist, Geist_Mono}       from "next/font/google";
import "./globals.css";
import React                     from "react";

export const metadata: Metadata = {
  title: {default: siteMeta.name, template: `%s | ${siteMeta.name}`},
  description: siteMeta.description,
  metadataBase: new URL(siteMeta.url),
  keywords: siteMeta.keywords,
  manifest: `${siteMeta.basePath}/manifest.json`,
  // TODO: "src": "icon-192x192.png",
  // TODO: "src": "icon-512x512.png",

  // ✅ icons（favicon）
  icons: { // TODO
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
    card: "summary_large_image", // TODO
    site: "@katsu1101",
    creator: "@katsu1101",
    title: siteMeta.name,
    description: siteMeta.description,
    images: ["og-image.png"], // TODO
  },
};

export const viewport: Viewport = {
  themeColor: [ // TODO
    {media: "(prefers-color-scheme: light)", color: "#FF0000"},
    {media: "(prefers-color-scheme: dark)", color: "#AA0000"},
  ],
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
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta
        name="apple-mobile-web-app-title"
        content={siteMeta.name}
      />
      <meta name="mobile-web-app-capable" content="yes"/>
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
