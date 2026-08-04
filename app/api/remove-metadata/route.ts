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

    pdf.setTitle("");
    pdf.setAuthor("");
    pdf.setSubject("");
    pdf.setCreator("");
    pdf.setProducer("");
    pdf.setKeywords([]);

    pdf.setModificationDate(new Date());

    const pdfBytes = await pdf.save();

    return new Response(new Uint8Array(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="metadata-removed.pdf"',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to remove metadata.", {
      status: 500,
    });
  }
}