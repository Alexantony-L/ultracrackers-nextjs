import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const admin =
    await prisma.admin.findFirst({
      where: {
        username: body.username,
        password: body.password,
      },
    });

  if (!admin) {
    return NextResponse.json(
      {
        success: false,
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
  });
}