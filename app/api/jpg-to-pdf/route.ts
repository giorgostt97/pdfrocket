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

    const files = formData.getAll("files") as File[];
    const toolName =
  (formData.get("tool") as string) || "JPG to PDF";

    if (files.length === 0) {
      return new Response("No images uploaded", {
        status: 400,
      });
    }

    const pdf = await PDFDocument.create();

    for (const file of files) {
      const bytes = await file.arrayBuffer();

      let image;

      if (
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      ) {
        image = await pdf.embedJpg(bytes);
      } else if (file.type === "image/png") {
        image = await pdf.embedPng(bytes);
      } else {
        continue;
      }

      const page = pdf.addPage([
        image.width,
        image.height,
      ]);

      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
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
        tool: toolName,
        fileName: files[0].name,
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
          'attachment; filename="images.pdf"',
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