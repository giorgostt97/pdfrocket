import { PDFDocument } from "pdf-lib";
import { NextRequest } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { prisma } from "@/lib/prisma";
import { useCredit } from "@/lib/credits";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const formData = await req.formData();
    const files = formData.getAll("files") as File[];

    if (files.length < 2) {
      return new Response("Please upload at least 2 PDFs.", {
        status: 400,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        clerkId: userId,
      },
    });

    if (!user) {
      return new Response("User not found.", {
        status: 404,
      });
    }

    const credit = await useCredit(
      userId,
      "Merge PDF",
      "merged.pdf"
    );

    if (!credit.success) {
      return new Response("No credits remaining.", {
        status: 403,
      });
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();

      const pdf = await PDFDocument.load(bytes, {
        ignoreEncryption: true,
      });

      const pages = await mergedPdf.copyPages(
        pdf,
        pdf.getPageIndices()
      );

      pages.forEach((page) => mergedPdf.addPage(page));
    }

    const pdfBytes = await mergedPdf.save();

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          'attachment; filename="merged.pdf"',
        "X-Credits-Remaining": String(
          credit.remainingCredits
        ),
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Something went wrong.", {
      status: 500,
    });
  }
}