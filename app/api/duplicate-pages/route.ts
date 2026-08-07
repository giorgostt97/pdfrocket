import { PDFDocument } from "pdf-lib";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return new Response("User not found", {
        status: 404,
      });
    }

    if (!user.isPro && user.credits <= 0) {
      return new Response("No credits remaining", {
        status: 403,
      });
    }

    const formData = await req.formData();

    const file = formData.get("file") as File;
    const pagesInput = (formData.get("pages") as string) ?? "";

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

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    const outputPdf = await PDFDocument.create();

    const totalPages = pdf.getPageCount();

    const pagesToDuplicate = pagesInput
      .split(",")
      .map((p) => parseInt(p.trim(), 10))
      .filter((p) => !isNaN(p));

    if (pagesToDuplicate.length === 0) {
      return new Response("No valid page numbers provided.", {
        status: 400,
      });
    }

    for (const page of pagesToDuplicate) {
      if (page < 1 || page > totalPages) {
        return new Response(
          `Page ${page} does not exist in this PDF.`,
          {
            status: 400,
          }
        );
      }
    }

    for (let i = 0; i < totalPages; i++) {
      const [page] = await outputPdf.copyPages(pdf, [i]);
      outputPdf.addPage(page);

      if (pagesToDuplicate.includes(i + 1)) {
        const [duplicate] = await outputPdf.copyPages(pdf, [i]);
        outputPdf.addPage(duplicate);
      }
    }

    const pdfBytes = await outputPdf.save();

    if (!user.isPro) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          credits: {
            decrement: 1,
          },
        },
      });
    }

    await prisma.history.create({
      data: {
        tool: "Duplicate Pages",
        fileName: file.name,
        userId: user.id,
      },
    });

    const remainingCredits = user.isPro
      ? "Unlimited"
      : user.credits - 1;

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="duplicated.pdf"',
        "X-Credits-Remaining":
          remainingCredits.toString(),
      },
    });

  } catch (error) {
    console.error(error);

    return new Response("Failed to duplicate pages.", {
      status: 500,
    });
  }
}