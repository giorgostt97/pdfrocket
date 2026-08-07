import { PDFDocument } from "pdf-lib";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
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
    const pagesInput = formData.get("pages") as string;

    if (!file || !pagesInput) {
      return new Response("Missing data", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    const totalPages = pdf.getPageCount();

    const pages = pagesInput
      .split(",")
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p))
      .sort((a, b) => b - a);

    for (const page of pages) {
      if (page >= 1 && page <= totalPages) {
        pdf.removePage(page - 1);
      }
    }

    if (pdf.getPageCount() === 0) {
      return new Response(
        "A PDF must contain at least one page.",
        {
          status: 400,
        }
      );
    }

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
        tool: "Delete Pages",
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
          'attachment; filename="deleted-pages.pdf"',
        "X-Credits-Remaining":
          remainingCredits.toString(),
      },
    });

  } catch (err) {
    console.error(err);

    return new Response("Something went wrong", {
      status: 500,
    });
  }
}