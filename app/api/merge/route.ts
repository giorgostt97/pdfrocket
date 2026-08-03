import { PDFDocument } from "pdf-lib";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];

    if (files.length < 2) {
      return new Response("Please upload at least 2 PDFs", {
        status: 400,
      });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();

      const pdf = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
      });

      const pages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();

    const pdfBuffer = Buffer.from(pdfBytes);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="merged.pdf"',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}