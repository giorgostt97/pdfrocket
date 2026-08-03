import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return new Response("No file uploaded.", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const outputPdf = await PDFDocument.create();

    const totalPages = pdf.getPageCount();

    for (let i = totalPages - 1; i >= 0; i--) {
      const [page] = await outputPdf.copyPages(pdf, [i]);
      outputPdf.addPage(page);
    }

    const pdfBytes = await outputPdf.save();

    return new Response(new Uint8Array(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="reversed.pdf"',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to reverse PDF.", {
      status: 500,
    });
  }
}