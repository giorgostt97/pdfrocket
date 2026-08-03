import { PDFDocument } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const pagesInput = (formData.get("pages") as string) || "";

    if (!file) {
      return new Response("No file uploaded.", {
        status: 400,
      });
    }

    if (!pagesInput.trim()) {
      return new Response("No pages provided.", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const outputPdf = await PDFDocument.create();

    const totalPages = pdf.getPageCount();

    const pagesToDuplicate = pagesInput
      .split(",")
      .map((p) => parseInt(p.trim(), 10))
      .filter(
        (p) =>
          !isNaN(p) &&
          p >= 1 &&
          p <= totalPages
      );

    for (let i = 0; i < totalPages; i++) {
      const [page] = await outputPdf.copyPages(pdf, [i]);
      outputPdf.addPage(page);

      if (pagesToDuplicate.includes(i + 1)) {
        const [duplicate] = await outputPdf.copyPages(pdf, [i]);
        outputPdf.addPage(duplicate);
      }
    }

    const pdfBytes = await outputPdf.save();

return new Response(new Uint8Array(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="duplicated.pdf"',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to duplicate pages.", {
      status: 500,
    });
  }
}