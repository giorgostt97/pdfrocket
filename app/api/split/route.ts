import { PDFDocument } from "pdf-lib";
import { NextRequest } from "next/server";
import AdmZip from "adm-zip";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No PDF uploaded", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    const zip = new AdmZip();

    const totalPages = pdf.getPageCount();

    for (let i = 0; i < totalPages; i++) {
      const newPdf = await PDFDocument.create();

      const [page] = await newPdf.copyPages(pdf, [i]);

      newPdf.addPage(page);

      const newPdfBytes = await newPdf.save();

      zip.addFile(
        `page-${i + 1}.pdf`,
        Buffer.from(newPdfBytes)
      );
    }

    const zipBuffer = zip.toBuffer();
const responseBuffer = Buffer.from(zipBuffer);

return new Response(responseBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition":
          'attachment; filename="split-pages.zip"',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}