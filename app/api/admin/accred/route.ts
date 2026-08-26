import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ru-central1",
  endpoint: process.env.YANDEX_STORAGE_ENDPOINT,
  credentials: {
    accessKeyId: process.env.YANDEX_STORAGE_ACCESS_KEY!,
    secretAccessKey: process.env.YANDEX_STORAGE_SECRET_KEY!,
  },
});

const allowedStages = [
  "Основной этап",
  "Второй этап",
  "Итог",
];

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File | null;

    const year = formData.get("year")?.toString();
    const month = formData.get("month")?.toString();
    const education = formData.get("education")?.toString();
    const specialization = formData.get("specialization")?.toString();
    const stage = formData.get("stage")?.toString();
    const name = formData.get("name")?.toString();

    if (!file) {
      return NextResponse.json(
        { error: "Файл не выбран" },
        { status: 400 }
      );
    }

    if (!year || !month || !education || !specialization || !stage) {
      return NextResponse.json(
        { error: "Не заполнены обязательные поля" },
        { status: 400 }
      );
    }

    if (!allowedStages.includes(stage)) {
      return NextResponse.json(
        { error: "Недопустимый этап" },
        { status: 400 }
      );
    }

    const maxSize = 20 * 1024 * 1024;

    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "Файл слишком большой. Максимум 20 МБ" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const extension =
      file.name.split(".").pop()?.toLowerCase() || "";

    const safeName =
      name?.trim()
        ? `${name.trim()}.${extension}`
        : file.name;

    const key = [
      "accred",
      year,
      month,
      education,
      specialization,
      stage,
      safeName,
    ]
      .map((item) =>
        item
          .replace(/[\/\\]/g, "-")
          .trim()
      )
      .join("/");

    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.YANDEX_STORAGE_BUCKET!,
        Key: key,
        Body: buffer,
        ContentType: file.type || "application/octet-stream",
      })
    );

    return NextResponse.json({
      success: true,
      key,
      fileName: safeName,
    });

  } catch (error) {
    console.error("Yandex upload error:", error);

    return NextResponse.json(
      { error: "Ошибка при загрузке файла" },
      { status: 500 }
    );
  }
}