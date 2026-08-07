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

    if (!file) {
      return new Response("No file uploaded.", {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

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
      creationDate:
        pdf.getCreationDate()?.toLocaleString() ?? "Not set",
      modificationDate:
        pdf.getModificationDate()?.toLocaleString() ?? "Not set",
      pageWidth: Math.round(width),
      pageHeight: Math.round(height),
    };

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
        tool: "PDF Information",
        fileName: file.name,
        userId: user.id,
      },
    });

    const remainingCredits = user.isPro
      ? "Unlimited"
      : user.credits - 1;

    return new Response(JSON.stringify(info), {
      headers: {
        "Content-Type": "application/json",
        "X-Credits-Remaining":
          remainingCredits.toString(),
      },
    });

  } catch (error) {
    console.error(error);

    return new Response("Failed to read PDF.", {
      status: 500,
    });
  }
}