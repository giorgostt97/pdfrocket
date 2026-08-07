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

    const title = (formData.get("title") as string) ?? "";
    const author = (formData.get("author") as string) ?? "";
    const subject = (formData.get("subject") as string) ?? "";
    const creator = (formData.get("creator") as string) ?? "";
    const keywords = (formData.get("keywords") as string) ?? "";

    const bytes = await file.arrayBuffer();

    const pdf = await PDFDocument.load(bytes, {
      ignoreEncryption: true,
    });

    if (title.trim()) pdf.setTitle(title);
    if (author.trim()) pdf.setAuthor(author);
    if (subject.trim()) pdf.setSubject(subject);
    if (creator.trim()) pdf.setCreator(creator);

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
        tool: "Edit PDF Metadata",
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
          'attachment; filename="metadata-updated.pdf"',
        "X-Credits-Remaining":
          remainingCredits.toString(),
      },
    });

  } catch (error) {
    console.error(error);

    return new Response("Failed to update metadata.", {
      status: 500,
    });
  }
}