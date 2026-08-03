import { PDFDocument, degrees } from "pdf-lib";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const rotation = Number(formData.get("rotation"));

    if (!file) {
      return new Response("No PDF uploaded", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    pdf.getPages().forEach((page) => {
      page.setRotation(degrees(rotation));
    });

    const pdfBytes = await pdf.save();
    const pdfBuffer = Buffer.from(pdfBytes);

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="rotated.pdf"',
      },
    });

  } catch (err) {
    console.error(err);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}