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
    const orderInput = formData.get("order") as string;

    if (!file || !orderInput.trim()) {
      return new Response("Missing data", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    const newPdf = await PDFDocument.create();

    const totalPages = pdf.getPageCount();

    const order = orderInput
      .split(",")
      .map((p) => parseInt(p.trim()))
      .filter((p) => !isNaN(p));

    if (order.length === 0) {
      return new Response("No valid page order provided.", {
        status: 400,
      });
    }

    for (const page of order) {
      if (page < 1 || page > totalPages) {
        return new Response(
          `Page ${page} does not exist in this PDF.`,
          {
            status: 400,
          }
        );
      }
    }

    for (const page of order) {
      const [copiedPage] = await newPdf.copyPages(pdf, [
        page - 1,
      ]);

      newPdf.addPage(copiedPage);
    }

    const pdfBytes = await newPdf.save();

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
        tool: "Reorder Pages",
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
          'attachment; filename="reordered.pdf"',
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