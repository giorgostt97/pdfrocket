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

    const title = (formData.get("title") as string) || "";
    const author = (formData.get("author") as string) || "";
    const subject = (formData.get("subject") as string) || "";
    const creator = (formData.get("creator") as string) || "";
    const keywords = (formData.get("keywords") as string) || "";

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    if (title) pdf.setTitle(title);
    if (author) pdf.setAuthor(author);
    if (subject) pdf.setSubject(subject);
    if (creator) pdf.setCreator(creator);

    if (keywords.trim()) {
      pdf.setKeywords(
        keywords
          .split(",")
          .map((k) => k.trim())
          .filter(Boolean)
      );
    }

    pdf.setModificationDate(new Date());

    const pdfBytes = await pdf.save();

    return new Response(new Uint8Array(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="metadata-updated.pdf"',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to update metadata.", {
      status: 500,
    });
  }
}