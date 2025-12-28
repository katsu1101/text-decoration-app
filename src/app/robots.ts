import type { MetadataRoute } from "next";

const siteUrl = "https://katsu1101.github.io";
const basePath = "/text-decoration-app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
      },
    ],
    sitemap: `${siteUrl}${basePath}/sitemap.xml`,
  };
}
