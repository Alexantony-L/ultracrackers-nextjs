import nodemailer from "nodemailer";

type SendOrderEmailParams = {
  ownerEmail?: string;
  customerEmail?: string;
  subject: string;
  order: Record<string, any>;
  pdfBuffer: Buffer;
  pdfFileName: string;
};

function createTransporter() {
  const smtpHost = process.env.SMTP_HOST;

  if (!smtpHost) {
    return null;
  }

  return nodemailer.createTransport({
    host: smtpHost,
    port: Number(process.env.SMTP_PORT || 587),
    secure: String(process.env.SMTP_SECURE || "false").toLowerCase() === "true",
    auth:
      process.env.SMTP_USER && process.env.SMTP_PASS
        ? {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          }
        : undefined,
  });
}

function buildOrderSummary(order: Record<string, any>) {
  return `
Order Number: ${order.orderNo}
Customer: ${order.customer}
Phone: ${order.phone}
Email: ${order.email}
Address: ${order.address}, ${order.city}, ${order.state}
Total: ₹${Number(order.total || 0).toLocaleString("en-IN")}

Items:
${(order.items || [])
  .map(
    (item: any) =>
      `- ${item.name} x ${item.qty} - ₹${(Number(item.qty || 0) * Number(item.price || 0)).toLocaleString("en-IN")}`
  )
  .join("\n")}
  `;
}

/**
 * Shared branded shell for both order emails — same blue header/footer
 * style as the invoice template, so owner + customer emails and the
 * attached PDF all look like one consistent brand.
 */
function emailShell(bodyContent: string) {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
</head>
<body style="margin:0; padding:0; background:#eef2f8; font-family:'Segoe UI', Arial, sans-serif; color:#1f2430;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef2f8; padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 18px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:#1D4ED8; padding:24px 32px;">
              <p style="margin:0; font-size:20px; font-weight:700; color:#ffffff;">UltraCrackers</p>
              <p style="margin:2px 0 0; font-size:12px; color:#dbe6ff;">Premium Fireworks &amp; Crackers</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${bodyContent}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px 28px; border-top:1px solid #eee; font-size:12px; color:#6b7a99; text-align:center; line-height:1.7;">
              <p style="margin:0;">Door no: 2/229, Plot no 1008, Survey no: 228/30, Village E. Muthulingapuram, Taluk Sattur, District Virudhunagar</p>
              <p style="margin:4px 0 0;">Contact: +91 8526230861 &nbsp;|&nbsp; +91 9360528398</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Owner notification — sent internally whenever a new order comes in.
 */
function buildOwnerHtml(order: Record<string, any>) {
  const body = `
    <p style="display:inline-block; margin:0 0 16px; padding:4px 12px; background:#e8edfc; color:#1D4ED8; font-size:12px; font-weight:600; border-radius:20px;">
      NEW ORDER
    </p>

    <h3 style="margin:0 0 8px; font-size:18px; color:#1f2430;">A new order has been placed</h3>
    <p style="margin:0 0 24px; font-size:14px; color:#6b7a99;">
      Order <strong style="color:#1f2430;">#${order.orderNo}</strong> was just placed on Ultra Crackers. Details below.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td style="padding:8px 0; font-size:13px; color:#6b7a99; width:120px;">Customer</td>
        <td style="padding:8px 0; font-size:14px; color:#1f2430; font-weight:600;">${order.customer}</td>
      </tr>
      <tr>
        <td style="padding:8px 0; font-size:13px; color:#6b7a99;">Phone</td>
        <td style="padding:8px 0; font-size:14px; color:#1f2430;">${order.phone}</td>
      </tr>
      <tr>
        <td style="padding:8px 0; font-size:13px; color:#6b7a99;">Address</td>
        <td style="padding:8px 0; font-size:14px; color:#1f2430;">${order.address}, ${order.city}, ${order.state}</td>
      </tr>
    </table>

    <div style="background:#f3f6fb; border-radius:8px; padding:16px 20px; font-family:'Courier New', monospace; font-size:13px; color:#1f2430; white-space:pre-wrap; line-height:1.6;">${buildOrderSummary(order)}</div>

    <p style="margin:24px 0 0; font-size:13px; color:#6b7a99;">
      Log in to the admin panel to process this order.
    </p>
  `;

  return emailShell(body);
}

/**
 * Customer confirmation — sent to the customer right after they order.
 */
function buildCustomerHtml(order: Record<string, any>) {
  const body = `
    <h3 style="margin:0 0 8px; font-size:18px; color:#1f2430;">Thank you for your order, ${order.customer}!</h3>
    <p style="margin:0 0 24px; font-size:14px; color:#6b7a99; line-height:1.6;">
      We've received your order and your invoice is attached below. Our team will contact you shortly to confirm the details.
    </p>

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6fb; border-radius:8px; margin-bottom:24px;">
      <tr>
        <td style="padding:16px 20px;">
          <p style="margin:0; font-size:12px; text-transform:uppercase; letter-spacing:0.5px; color:#6b7a99;">Order Number</p>
          <p style="margin:4px 0 0; font-size:20px; font-weight:700; color:#1D4ED8;">#${order.orderNo}</p>
        </td>
      </tr>
    </table>

    <p style="margin:0 0 4px; font-size:14px; color:#1f2430;">What happens next?</p>
    <p style="margin:0; font-size:14px; color:#6b7a99; line-height:1.6;">
      Our team will reach out to you at <strong style="color:#1f2430;">${order.phone}</strong> to confirm your order and delivery details.
    </p>

    <p style="margin:24px 0 0; font-size:14px; color:#1f2430;">
      Thank you for choosing <strong>UltraCrackers</strong>!
    </p>
  `;

  return emailShell(body);
}

export async function sendOrderEmails({
  ownerEmail,
  customerEmail,
  subject,
  order,
  pdfBuffer,
  pdfFileName,
}: SendOrderEmailParams) {
  const transporter = createTransporter();
  const fromAddress = process.env.MAIL_FROM || process.env.SMTP_USER || "orders@ultracrackers.com";

  if (!transporter) {
    console.warn("SMTP is not configured. Skipping invoice emails.");
    return;
  }

  const attachment = {
    filename: pdfFileName,
    content: pdfBuffer,
  };

  const ownerHtml = buildOwnerHtml(order);
  const customerHtml = buildCustomerHtml(order);

  if (ownerEmail) {
    await transporter.sendMail({
      from: fromAddress,
      to: ownerEmail,
      subject,
      html: ownerHtml,
      attachments: [attachment],
    });
  }

  if (customerEmail) {
    await transporter.sendMail({
      from: fromAddress,
      to: customerEmail,
      subject: `Your invoice for ${order.orderNo}`,
      html: customerHtml,
      attachments: [attachment],
    });
  }
}