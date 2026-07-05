import { NextResponse } from "next/server";
import { invoiceTemplate } from "@/lib/invoice/invoiceTemplate";
import { generatePdf } from "@/lib/invoice/pdf";
import { sendOrderEmails } from "@/lib/invoice/mail";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const order = await req.json();

    if (!order?.items?.length) {
      return NextResponse.json(
        { success: false, message: "Cart is empty." },
        { status: 400 }
      );
    }

    const normalizedOrder = {
      orderNo: order.orderNo || `ORD-${Date.now()}`,
      customer: order.customer || order.name || "",
      phone: order.phone || order.mobile || "",
      email: order.email || "",
      address: order.address || "",
      city: order.city || "",
      state: order.state || "",
      total: Number(order.total || 0),
      subtotal: Number(order.subtotal || 0),
      items: (order.items || []).map((item: any) => ({
        name: item.name,
        qty: Number(item.qty ?? item.quantity ?? 1),
        price: Number(item.price ?? 0),
      })),
    };

    const html = invoiceTemplate(normalizedOrder);
    const fileName = `invoice-${Date.now()}`;
    const invoice = await generatePdf(html, fileName);

    const db = prisma as typeof prisma & {
      order: {
        create: (args: { data: Record<string, unknown> }) => Promise<unknown>;
      };
    };

    await db.order.create({
      data: {
        orderNo: normalizedOrder.orderNo,
        customer: normalizedOrder.customer,
        phone: normalizedOrder.phone,
        email: normalizedOrder.email,
        address: normalizedOrder.address,
        city: normalizedOrder.city,
        state: normalizedOrder.state,
        total: normalizedOrder.total,
        subtotal: normalizedOrder.subtotal,
        items: normalizedOrder.items,
        invoiceUrl: invoice.publicUrl,
      },
    });

    await sendOrderEmails({
      ownerEmail: process.env.OWNER_EMAIL,
      customerEmail: normalizedOrder.email,
      subject: `New order received - ${normalizedOrder.orderNo}`,
      order: normalizedOrder,
      pdfBuffer: invoice.pdfBuffer,
      pdfFileName: `${fileName}.pdf`,
    });

    return NextResponse.json({
      success: true,
      invoice: invoice.publicUrl,
      orderNo: normalizedOrder.orderNo,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "Failed to place order." },
      { status: 500 }
    );
  }
}