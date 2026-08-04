import { Metadata } from "next";

export function createToolMetadata(
  tool: string,
  description: string,
  slug: string
): Metadata {
  return {
    title: `${tool} Online for Free | PDFRocket`,
    description,

    alternates: {
      canonical: `https://pdfrocket.app/${slug}`,
    },

    openGraph: {
      title: `${tool} Online for Free | PDFRocket`,
      description,
      url: `https://pdfrocket.app/${slug}`,
      siteName: "PDFRocket",
      type: "website",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "PDFRocket",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${tool} Online for Free | PDFRocket`,
      description,
      images: ["/og-image.png"],
    },
  };
}