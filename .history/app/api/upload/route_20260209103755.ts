import { S3 } from "aws-sdk";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // отключаем встроенный bodyParser, чтобы formidable мог работать
  },
};

const s3 = new S3({
  endpoint: "https://storage.yandexcloud.net", // S3-совместимый endpoint
  accessKeyId: process.env.YC_ACCESS_KEY,      // твой Access Key
  secretAccessKey: process.env.YC_SECRET_KEY,  // твой Secret Key
});

export async function POST(req) {
  const form = new formidable.IncomingForm();

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);

      const file = files.file; // поле <input name="file">
      const fileContent = fs.readFileSync(file.filepath);

      const fileName = file.originalFilename;

      try {
        const upload = await s3.upload({
          Bucket: process.env.YC_BUCKET, // имя твоего бакета
          Key: fileName,
          Body: fileContent,
          ACL: "public-read",            // чтобы файл был публичным
        }).promise();

        resolve(
          new Response(JSON.stringify({ url: upload.Location }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          })
        );
      } catch (e) {
        resolve(new Response(JSON.stringify({ error: e.message }), { status: 500 }));
      }
    });
  });
}
