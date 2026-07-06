import { NextResponse } from "next/server";


import { invoiceTemplate } from "@/lib/invoice/invoiceTemplate";
import { generatePdf } from "@/lib/invoice/pdf";


export async function POST(req: Request) {
  try {
    // console.log("api hit")
    // 1. Receive order from frontend
    const order = await req.json();

    // 2. Save order
    // const savedOrder = await prisma.order.create({
    //   data: order,
    // });

    // 3. Convert React component → HTML

    const html = invoiceTemplate(order);
    const fileName = `invoice-${Date.now()}`;
    // 4. Generate PDF and save it
    const invoice = await generatePdf(
      html,
      fileName
    );

    // 5. Send email
    // await sendInvoiceEmail({
    //   to: order.email,
    //   pdfPath: invoice.filePath,
    // });

    // 6. Return success
    return NextResponse.json({
      success: true,
      invoice: invoice.publicUrl,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}