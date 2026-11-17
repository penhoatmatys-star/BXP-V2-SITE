import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE.url}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}/privacy/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/legal-notice/`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
