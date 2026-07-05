import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const products =
    await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

  return NextResponse.json(
    products
  );
}

export async function POST(
  req: Request
) {
  const body = await req.json();

  const product =
    await prisma.product.create({
      data: {
        name: body.name,
        description:
          body.description,
        price: Number(
          body.price
        ),
        mrp: body.mrp ? Number(body.mrp) : null,
        unit: body.unit || null,
        imageUrl:
          body.imageUrl,
        categoryId: body.categoryId ? Number(body.categoryId) : null,
        active: true,
      },
    });

  return NextResponse.json(
    product
  );
}