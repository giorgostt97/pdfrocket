import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { GoogleAnalytics } from "@next/third-parties/google";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pdfrocket.app"),

  title: {
    default: "PDFRocket - Free Online PDF Tools",
    template: "%s | PDFRocket",
  },

  description:
    "Free online PDF tools to merge, split, rotate, reorder, watermark, convert, and edit PDF files. Fast, secure, and works directly in your browser.",

  keywords: [
    "PDF",
    "PDF Tools",
    "Merge PDF",
    "Split PDF",
    "Rotate PDF",
    "Delete PDF Pages",
    "Extract PDF Pages",
    "Reorder PDF",
    "Reverse PDF",
    "Duplicate PDF Pages",
    "Watermark PDF",
    "Add Page Numbers",
    "PDF Information",
    "Edit PDF Metadata",
    "Remove PDF Metadata",
    "PDF Thumbnails",
    "PDF to JPG",
    "PDF to PNG",
    "JPG to PDF",
    "Free PDF Editor",
    "Online PDF Tools",
  ],

  authors: [
    {
      name: "PDFRocket",
    },
  ],

  creator: "PDFRocket",

  publisher: "PDFRocket",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "PDFRocket - Free Online PDF Tools",
    description:
      "Merge, split, rotate, watermark, convert and edit PDFs online for free.",
    url: "https://pdfrocket.app",
    siteName: "PDFRocket",
    locale: "en_US",
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
    title: "PDFRocket - Free Online PDF Tools",
    description: "Fast, secure and free online PDF tools.",
    images: ["/og-image.png"],
  },

  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
      {
        url: "/favicon-96x96.png",
        type: "image/png",
        sizes: "96x96",
      },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="bg-black text-white min-h-screen">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#18181b",
              color: "#ffffff",
              border: "1px solid #27272a",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#ffffff",
              },
            },
          }}
        />

        <Navbar />

        {children}

        <Footer />

        <GoogleAnalytics gaId="G-5JPRV9DPF7" />
      </body>
    </html>
  );
}