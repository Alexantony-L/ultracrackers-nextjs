// import { chromium } from "playwright";
import type { Browser } from "puppeteer-core";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium";
import { put } from "@vercel/blob";
import path from "path";
import fs from "fs/promises";

// export async function generatePdf(
//   html: string,
//   fileName: string
// ) {
//   const browser = await chromium.launch({
//     headless: true,
//   });

//   const page = await browser.newPage();

//   await page.setContent(html, {
//     waitUntil: "networkidle",
//   });

//   const pdf = await page.pdf({
//     format: "A4",
//     printBackground: true,
//   });

//   await browser.close();

//   const invoiceDir = path.join(
//     process.cwd(),
//     "public",
//     "invoices"
//   );

//   // Create folder if it doesn't exist
//   await fs.mkdir(invoiceDir, {
//     recursive: true,
//   });

//   const filePath = path.join(
//     invoiceDir,
//     `${fileName}.pdf`
//   );

//   await fs.writeFile(filePath, pdf);

//   return {
//     pdfBuffer: pdf,
//     filePath,
//     publicUrl: `/invoices/${fileName}.pdf`,
//   };
// }




async function launchBrowser(): Promise<Browser> {
  const isVercel = !!process.env.VERCEL;
 
  if (isVercel) {
    return puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
  }
 
  // Local development: use full `puppeteer`'s own bundled Chromium,
  // which matches whatever OS you're actually developing on.
  const puppeteer = (await import("puppeteer")).default;
  const localBrowser = await puppeteer.launch({ headless: true });
  return localBrowser as unknown as Browser;
}
 
// export async function generatePdf(html: string, fileName: string) {
//   const browser = await launchBrowser();
 
//   let pdf: Buffer;
 
//   try {
//     const page = await browser.newPage();
//     await page.setContent(html, { waitUntil: "load" });
 
//     const pdfBytes = await page.pdf({
//       format: "A4",
//       printBackground: true,
//     });
 
//     pdf = Buffer.from(pdfBytes);
//   } finally {
//     await browser.close();
//   }
 
//   const invoiceDir = path.join(process.cwd(), "public", "invoices");
 
//   // Create folder if it doesn't exist
//   await fs.mkdir(invoiceDir, {
//     recursive: true,
//   });
 
//   const filePath = path.join(invoiceDir, `${fileName}.pdf`);
 
//   await fs.writeFile(filePath, pdf);
 
//   return {
//     pdfBuffer: pdf,
//     filePath,
//     publicUrl: `/invoices/${fileName}.pdf`,
//   };
// }
 


export async function generatePdf(
  html: string,
  fileName: string
) {
  const browser = await launchBrowser();

  let pdf: Buffer;

  try {
    const page = await browser.newPage();

    await page.setContent(html, {
      waitUntil: "load",
    });

    const pdfBytes = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    pdf = Buffer.from(pdfBytes);
  } finally {
    await browser.close();
  }

  // Upload to Vercel Blob
  const blob = await put(
    `invoices/${fileName}.pdf`,
    pdf,
    {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/pdf",
    }
  );
// console.log(blob.url,
//     blob.downloadUrl,)
  return {
    pdfBuffer: pdf,
    publicUrl: blob.url,
    downloadUrl: blob.downloadUrl,
    pathname: blob.pathname,
  };
}