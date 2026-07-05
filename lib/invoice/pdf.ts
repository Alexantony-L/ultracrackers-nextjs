import { chromium } from "playwright";
import fs from "fs/promises";
import path from "path";

export async function generatePdf(
  html: string,
  fileName: string
) {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();

  await page.setContent(html, {
    waitUntil: "networkidle",
  });

  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  const invoiceDir = path.join(
    process.cwd(),
    "public",
    "invoices"
  );

  // Create folder if it doesn't exist
  await fs.mkdir(invoiceDir, {
    recursive: true,
  });

  const filePath = path.join(
    invoiceDir,
    `${fileName}.pdf`
  );

  await fs.writeFile(filePath, pdf);

  return {
    pdfBuffer: pdf,
    filePath,
    publicUrl: `/invoices/${fileName}.pdf`,
  };
}