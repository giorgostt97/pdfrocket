import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://pdfrocket.app",
      priority: 1,
    },
    {
      url: "https://pdfrocket.app/merge",
    },
    {
      url: "https://pdfrocket.app/split",
    },
    {
      url: "https://pdfrocket.app/rotate",
    },
    {
      url: "https://pdfrocket.app/jpg-to-pdf",
    },
  ];
}