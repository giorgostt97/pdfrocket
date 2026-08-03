import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "PDFRocket - Free Online PDF Tools",
  description:
    "Merge, Split, Rotate and Convert PDF files online for free. Fast, secure and easy to use.",
  keywords: [
    "PDF",
    "Merge PDF",
    "Split PDF",
    "Rotate PDF",
    "JPG to PDF",
    "Free PDF Tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
      </body>
    </html>
  );
}