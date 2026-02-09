import { S3 } from "aws-sdk";
import formidable, { File, Files, Fields } from "formidable";
import fs from "fs";
import type { NextRequest } from "next/server";

export const config = {
  api: {
    bodyParser: false,
  },
};

const bucketName = process.env.YC_BUCKET as string;
const accessKey = process.env.YC_ACCESS_KEY as string;
const secretKey = process.env.YC_SECRET_KEY as string;

const s3 = new S3({
  endpoint: "https://storage.yandexcloud.net",
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
});

export async function POST(req: NextRequest) {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req as any, async (err: any, fields: Fields, files: Files) => {
      if (err) return reject(err);

      // Проверяем, что файл точно есть
      const uploadedFile = files.file;
      if (!uploadedFile) {
        return resolve(
          new Response(JSON.stringify({ error: "Файл не найден" }), { status: 400 })
        );
      }

      // Если это массив файлов, берём первый
      const file: File = Array.isArray(uploadedFile) ? uploadedFile[0] : uploadedFile;

      const fileContent = fs.readFileSync(file.filepath);
      const fileName = file.originalFilename || "file";

      try {
        const upload = await s3
          .upload({
            Bucket: bucketName,
            Key: fileName,
            Body: fileContent,
            ACL: "public-read",
          })
          .promise();

        resolve(
          new Response(JSON.stringify({ url: upload.Location }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        );
      } catch (e: any) {
        resolve(
          new Response(JSON.stringify({ error: e.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          })
        );
      }
    });
  });
}
