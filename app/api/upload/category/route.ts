import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("file") as File;

  if (!file) {
    return Response.json(
      { error: "No file uploaded" },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName =
    `${Date.now()}-${file.name.replace(/\s/g, "-")}`;

  const uploadPath = path.join(
    process.cwd(),
    "public",
    "uploads",
    "category",
    fileName
  );

  await writeFile(uploadPath, buffer);

  const imageUrl = `/uploads/category/${fileName}`;

  return Response.json({
    imageUrl,
    url: imageUrl,
  });
}