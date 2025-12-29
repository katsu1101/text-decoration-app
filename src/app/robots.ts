import {siteMeta}           from "@/lib/siteMetadata";
import {sitemapUrl}         from "@/lib/url";
import type {MetadataRoute} from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
      },
    ],
    sitemap: sitemapUrl(siteMeta.url),
  };
}
