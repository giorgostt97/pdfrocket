import { PDFDocument } from "pdf-lib";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return new Response("No images uploaded", {
        status: 400,
      });
    }

    const pdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();

      let image;

      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        image = await pdf.embedJpg(bytes);
      } else if (file.type === "image/png") {
        image = await pdf.embedPng(bytes);
      } else {
        continue;
      }

      const page = pdf.addPage([
        image.width,
        image.height,
      ]);

      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
    }

    const pdfBytes = await pdf.save();
const pdfBuffer = Buffer.from(pdfBytes);

return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="images.pdf"',
      },
    });
  } catch (err) {
    console.error(err);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}