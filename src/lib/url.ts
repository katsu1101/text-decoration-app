// src/lib/url.ts
export const toAbsoluteUrl = (siteRootUrl: string, path: string) => {
  // siteRootUrl: "https://.../text-decoration-app/" のように末尾 / 推奨
  // path: "/eisu" でも "eisu" でもOKにする
  const normalized = path.replace(/^\//, "");
  return new URL(normalized, siteRootUrl).toString();
};

export const sitemapUrl = (siteRootUrl: string) => {
  return new URL("sitemap.xml", siteRootUrl).toString();
};
