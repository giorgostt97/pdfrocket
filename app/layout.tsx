import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { Metadata } from "next";

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
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}