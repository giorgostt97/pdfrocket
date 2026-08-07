import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const pages = [
    {
      path: "",
      priority: 1,
      changeFrequency: "daily" as const,
    },
    {
      path: "/merge",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/split",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/rotate",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/jpg-to-pdf",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/delete-pages",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/extract-pages",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/watermark",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/reorder",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/page-numbers",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/reverse-pages",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/duplicate-pages",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/pdf-information",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/edit-metadata",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/remove-metadata",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/pdf-thumbnails",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/pdf-to-jpg",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/pdf-to-png",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/ocr",
      priority: 0.9,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/pricing",
      priority: 0.8,
      changeFrequency: "monthly" as const,
    },
    {
      path: "/about",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
  ];

  return pages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}