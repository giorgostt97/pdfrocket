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

    const page = pdf.getPage(0);
    const { width, height } = page.getSize();

    const info = {
      fileName: file.name,
      pageCount: pdf.getPageCount(),
      title: pdf.getTitle() ?? "Not set",
      author: pdf.getAuthor() ?? "Not set",
      subject: pdf.getSubject() ?? "Not set",
      creator: pdf.getCreator() ?? "Not set",
      producer: pdf.getProducer() ?? "Not set",
      keywords: pdf.getKeywords() ?? "Not set",
      creationDate: pdf.getCreationDate()?.toLocaleString() ?? "Not set",
      modificationDate:
        pdf.getModificationDate()?.toLocaleString() ?? "Not set",
      pageWidth: Math.round(width),
      pageHeight: Math.round(height),
    };

    return Response.json(info);
  } catch (error) {
    console.error(error);

    return new Response("Failed to read PDF.", {
      status: 500,
    });
  }
}