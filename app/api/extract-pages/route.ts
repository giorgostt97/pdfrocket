import { PDFDocument } from "pdf-lib";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const pagesInput = formData.get("pages") as string;

    if (!file || !pagesInput) {
      return new Response("Missing data", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const newPdf = await PDFDocument.create();

    const totalPages = pdf.getPageCount();

    const pages = pagesInput
      .split(",")
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p));

    for (const page of pages) {
      if (page >= 1 && page <= totalPages) {
        const [copiedPage] = await newPdf.copyPages(pdf, [
          page - 1,
        ]);

        newPdf.addPage(copiedPage);
      }
    }

    const pdfBytes = await newPdf.save();

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="extracted-pages.pdf"',
      },
    });
  } catch (err) {
    console.error(err);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}