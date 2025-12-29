import {siteMeta}           from "@/lib/siteMetadata";
import {toAbsoluteUrl}      from "@/lib/url";
import type {MetadataRoute} from "next";

export const dynamic = "force-static";

type Entry = {
  path: string;
  changeFrequency?: "daily" | "weekly" | "monthly";
  priority?: number;
};

const entries: Entry[] = [
  {path: "/", changeFrequency: "weekly", priority: 1.0},

  // ツール本体
  {path: "/eisu", changeFrequency: "weekly", priority: 0.9},
  {path: "/mori", changeFrequency: "weekly", priority: 0.9},

  // 使い方
  {path: "/guide", changeFrequency: "monthly", priority: 0.7},
  {path: "/guide/waku", changeFrequency: "monthly", priority: 0.6},
  {path: "/guide/eisu", changeFrequency: "monthly", priority: 0.6},
  {path: "/guide/mori", changeFrequency: "monthly", priority: 0.6},
];

export default function sitemap(): MetadataRoute.Sitemap {
  // const now = new Date();

  return entries.map((e) => ({
    url: toAbsoluteUrl(siteMeta.url, e.path),
    changeFrequency: e.changeFrequency ?? "weekly",
    priority: e.priority ?? 0.7,
  }));
}
