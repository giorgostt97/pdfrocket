import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;
    const position = (formData.get("position") as string) || "bottom-center";

    if (!file) {
      return new Response("No file uploaded.", { status: 400 });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes);

    const font = await pdf.embedFont(StandardFonts.Helvetica);

    const pages = pdf.getPages();

    pages.forEach((page, index) => {
      const { width, height } = page.getSize();

      const text = `${index + 1} / ${pages.length}`;

      const size = 12;

      let x = width / 2 - 20;
      let y = 20;

      switch (position) {
        case "top-left":
          x = 20;
          y = height - 30;
          break;

        case "top-center":
          x = width / 2 - 20;
          y = height - 30;
          break;

        case "top-right":
          x = width - 60;
          y = height - 30;
          break;

        case "bottom-left":
          x = 20;
          y = 20;
          break;

        case "bottom-right":
          x = width - 60;
          y = 20;
          break;

        default:
          x = width / 2 - 20;
          y = 20;
      }

      page.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
      });
    });

    const pdfBytes = await pdf.save();

    return new Response(new Uint8Array(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="numbered.pdf"',
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Failed to add page numbers.", {
      status: 500,
    });
  }
}