import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "PDFRocket",
  description: "Free PDF tools online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">

  <Navbar />

  {children}

  <Footer />

</body>
    </html>
  );
}