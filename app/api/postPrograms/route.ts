import { db } from "@/lib/db";
import { ResultSetHeader, RowDataPacket } from "mysql2/promise";

function transliterate(text: string) {
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "shch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  };

  return text
    .toLowerCase()
    .split("")
    .map((char) => map[char] ?? char)
    .join("");
}

function generateSlug(text: string) {
  return transliterate(text)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  try {
    const program = await req.json();

    const {
      name,
      time,
      specialization,
      isFavorite,
      bannerName,
      description,
      price,
      suptitle,
    } = program;

    const category =
      program.category || "Повышение квалификации";

    const education =
      program.education || "Высшее";

  
    const baseSlug = generateSlug(name);

    let slug = baseSlug;
    let counter = 2;


    while (true) {
      const [rows] = await db.query<RowDataPacket[]>(
        "SELECT id FROM programms WHERE slug = ? LIMIT 1",
        [slug]
      );

      if (rows.length === 0) {
        break;
      }

      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO programms
        (name, time, category, education, specialization, isFavorite, bannerName, description, price, slug, suptitle)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        time,
        category,
        education,
        specialization,
        isFavorite,
        bannerName,
        description,
        price,
        slug,
        suptitle,
      ]
    );

    return new Response(
      JSON.stringify({
        success: true,
        id: result.insertId,
        slug,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({ error: "Ошибка сервера" }),
      { status: 500 }
    );
  }
}