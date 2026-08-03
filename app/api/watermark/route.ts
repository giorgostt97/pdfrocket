import {
  PDFDocument,
  StandardFonts,
  rgb,
  degrees,
} from "pdf-lib";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const text = formData.get("text") as string;

    if (!file || !text) {
      return new Response("Missing data", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const font = await pdf.embedFont(StandardFonts.HelveticaBold);

    const pages = pdf.getPages();

    for (const page of pages) {
      const { width, height } = page.getSize();

      page.drawText(text, {
        x: width / 4,
        y: height / 2,
        size: 40,
        font,
        color: rgb(0.7, 0.7, 0.7),
        rotate: degrees(-45),
        opacity: 0.3,
      });
    }

    const pdfBytes = await pdf.save();

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="watermarked.pdf"',
      },
    });
  } catch (err) {
    console.error(err);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}