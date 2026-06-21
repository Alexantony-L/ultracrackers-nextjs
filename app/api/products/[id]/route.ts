import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } = await params;

  const product =
    await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });

  return NextResponse.json(product);
}


export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  const body =
    await req.json();

  const product =
    await prisma.product.update({
      where: {
        id: Number(id),
      },
      data: {
        name: body.name,
        description:
          body.description,
        active: body.active,
        price: Number(
          body.price
        ),
      },
    });

  return NextResponse.json(
    product
  );
}




export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  const { id } =
    await params;

  await prisma.product.delete({
    where: {
      id: Number(id),
    },
  });

  return NextResponse.json({
    success: true,
  });
}