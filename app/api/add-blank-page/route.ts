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
    const pageInput = formData.get("page") as string;

    if (!file || !pageInput) {
      return new Response("Missing data", {
        status: 400,
      });
    }

    const pageNumber = parseInt(pageInput);

    if (isNaN(pageNumber) || pageNumber < 1) {
      return new Response("Invalid page number", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    const totalPages = pdf.getPageCount();

    if (pageNumber > totalPages + 1) {
      return new Response(
        `Page position must be between 1 and ${
          totalPages + 1
        }.`,
        {
          status: 400,
        }
      );
    }

    pdf.insertPage(pageNumber - 1);

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
        tool: "Add Blank Page",
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
          'attachment; filename="blank-page-added.pdf"',
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