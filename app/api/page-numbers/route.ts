import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";
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
    const position =
      (formData.get("position") as string) ??
      "bottom-center";

    if (!file) {
      return new Response("No file uploaded.", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    const font = await pdf.embedFont(
      StandardFonts.Helvetica
    );

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
        tool: "Add Page Numbers",
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
          'attachment; filename="numbered.pdf"',
        "X-Credits-Remaining":
          remainingCredits.toString(),
      },
    });

  } catch (error) {
    console.error(error);

    return new Response(
      "Failed to add page numbers.",
      {
        status: 500,
      }
    );
  }
}