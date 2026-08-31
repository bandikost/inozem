import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { db } from "@/lib/db";

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

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const sanitize = (value: string) =>
  value
    .replace(/[\/\\]/g, "-")
    .replace(/\s+/g, " ")
    .trim();

const createPublicUrl = (key: string) => {
  const baseUrl =
    process.env.YANDEX_STORAGE_PUBLIC_URL!;

  const encodedKey = key
    .split("/")
    .map(encodeURIComponent)
    .join("/");

  return `${baseUrl}/${encodedKey}`;
};



export async function GET() {
  try {
    const [rows] = await db.execute(`
      SELECT
        id,
        year,
        month,
        education,
        specialization,
        stage,
        name,
        link,
        created_at
      FROM accreditation
      ORDER BY created_at DESC
    `);

    return NextResponse.json({
      success: true,
      items: rows,
    });

  } catch (error) {

    console.error(
      "Accred GET error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Не удалось загрузить протоколы",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest
) {
  let uploadedKey: string | null = null;

  try {
    const formData =
      await req.formData();

    const file =
      formData.get("file");

    const year =
      formData.get("year")?.toString().trim();

    const month =
      formData.get("month")?.toString().trim();

    const education =
      formData.get("education")
        ?.toString()
        .trim();

    const specialization =
      formData.get("specialization")
        ?.toString()
        .trim();

    const stage =
      formData.get("stage")
        ?.toString()
        .trim();

    let name =
      formData.get("name")
        ?.toString()
        .trim();

    if (!(file instanceof File)) {
      return NextResponse.json(
        {
          error: "Файл не выбран",
        },
        { status: 400 }
      );
    }

    if (
      !year ||
      !month ||
      !education ||
      !specialization ||
      !stage
    ) {
      return NextResponse.json(
        {
          error:
            "Заполните все обязательные поля",
        },
        { status: 400 }
      );
    }

    if (!allowedStages.includes(stage)) {
      return NextResponse.json(
        {
          error:
            "Недопустимый этап",
        },
        { status: 400 }
      );
    }

    if (file.size === 0) {
      return NextResponse.json(
        {
          error: "Файл пустой",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error:
            "Файл слишком большой. Максимум 20 МБ",
        },
        { status: 400 }
      );
    }


    if (!name) {
      name = file.name.replace(
        /\.[^/.]+$/,
        ""
      );
    }

    const safeYear =
      sanitize(year);

    const safeEducation =
      sanitize(education);

    const safeSpecialization =
      sanitize(specialization);

    const safeName =
      sanitize(name);


    const extension =
      file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "pdf";

    const uniqueId =
      crypto.randomUUID();

    const safeFileName =
      `${safeName}-${uniqueId}.${extension}`;


    const storageKey = [
      "accred",
      safeYear,
      safeEducation,
      safeSpecialization,
      safeFileName,
    ].join("/");


    const buffer =
      Buffer.from(
        await file.arrayBuffer()
      );


    await s3.send(
      new PutObjectCommand({
        Bucket:
          process.env
            .YANDEX_STORAGE_BUCKET!,

        Key: storageKey,

        Body: buffer,

        ContentType:
          file.type ||
          "application/octet-stream",
      })
    );

    uploadedKey =
      storageKey;


    const link =
      createPublicUrl(
        storageKey
      );


    const [result] =
      await db.execute(
        `
          INSERT INTO accreditation
          (
            year,
            month,
            education,
            specialization,
            stage,
            name,
            link,
            storage_key
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          year,
          month,
          education,
          specialization,
          stage,
          safeName,
          link,
          storageKey,
        ]
      );


    return NextResponse.json({
      success: true,

      id: (result as any)
        .insertId,

      name: safeName,

      link,

      storage_key:
        storageKey,
    });


  } catch (error) {

    console.error(
      "Accred POST error:",
      error
    );


    if (uploadedKey) {

      try {

        await s3.send(
          new DeleteObjectCommand({
            Bucket:
              process.env
                .YANDEX_STORAGE_BUCKET!,

            Key: uploadedKey,
          })
        );

      } catch (cleanupError) {

        console.error(
          "Cleanup error:",
          cleanupError
        );
      }
    }


    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Ошибка при загрузке протокола",
      },
      { status: 500 }
    );
  }
}


export async function DELETE(
  req: NextRequest
) {

  try {

    const { searchParams } =
      new URL(req.url);

    const id =
      searchParams.get("id");


    if (!id) {

      return NextResponse.json(
        {
          error:
            "Не указан ID протокола",
        },
        { status: 400 }
      );
    }


    const [rows] =
      await db.execute(
        `
          SELECT storage_key
          FROM accreditation
          WHERE id = ?
          LIMIT 1
        `,
        [id]
      );


    const items =
      rows as {
        storage_key:
          string | null;
      }[];


    if (!items.length) {

      return NextResponse.json(
        {
          error:
            "Протокол не найден",
        },
        { status: 404 }
      );
    }


    const storageKey =
      items[0].storage_key;


    if (storageKey) {

      await s3.send(
        new DeleteObjectCommand({
          Bucket:
            process.env
              .YANDEX_STORAGE_BUCKET!,

          Key: storageKey,
        })
      );
    }


    await db.execute(
      `
        DELETE FROM accreditation
        WHERE id = ?
      `,
      [id]
    );


    return NextResponse.json({
      success: true,
    });


  } catch (error) {

    console.error(
      "Accred DELETE error:",
      error
    );


    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Не удалось удалить протокол",
      },
      { status: 500 }
    );
  }
}