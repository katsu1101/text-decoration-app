import type { MetadataRoute } from "next";

const siteUrl = "https://katsu1101.github.io";
const basePath = "/text-decoration-app";

type Entry = {
  path: string;
  changeFrequency?: "daily" | "weekly" | "monthly";
  priority?: number;
};

const entries: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  // 例: ルートがあるなら追加
  // { path: "/combine", changeFrequency: "weekly", priority: 0.8 },
  // { path: "/script", changeFrequency: "weekly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return entries.map((e) => ({
    url: `${siteUrl}${basePath}${e.path}`,
    lastModified: now,
    changeFrequency: e.changeFrequency ?? "weekly",
    priority: e.priority ?? 0.7,
  }));
}
