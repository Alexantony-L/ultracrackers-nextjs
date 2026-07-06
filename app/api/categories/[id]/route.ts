import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const category = await prisma.category.findUnique({
    where: { id: Number(id) },
  });

  return NextResponse.json(category);
}

export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;
  const body = await req.json();

  const slug =
    body.slug ||
    (body.name || "")
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

  const category = await prisma.category.update({
    where: { id: Number(id) },
    data: { name: body.name, slug, imageUrl: body.imageUrl || null },
  });
  // console.log("Updated category:", category);

  return NextResponse.json(category);
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  await prisma.category.delete({ where: { id: Number(id) } });

  return NextResponse.json({ success: true });
}
