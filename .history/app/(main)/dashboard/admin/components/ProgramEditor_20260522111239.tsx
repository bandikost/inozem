"use client";

import { useState } from "react";
import BlockEditor from "./BlockEditor";
import { Block } from "@/lib/Block/Block";


type Program = {
  specialization: string;
  id?: number;
  name: string;
  slug: string;
  price: number;
  education: string;
  category: string;
  diplom: string;
  time: string;

  blocks: Block[];
};

export default function ProgramEditor({
  initialProgram,
}: {
  initialProgram: any;
}) {
 const [program, setProgram] = useState<Program>({
  id: initialProgram?.id,

  specialization:
    initialProgram?.specialization || "",

  name:
    initialProgram?.name || "",

  slug:
    initialProgram?.slug || "",

  price:
    initialProgram?.price || 0,

  education:
    initialProgram?.education || "",

  category:
    initialProgram?.category || "",

  diplom:
    initialProgram?.diplom || "",

  time:
    initialProgram?.time || "",

  blocks:
    initialProgram?.blocks || [],
});

 const addBlock = () => {
  setProgram((p) => ({
    ...p,
    blocks: [
      ...p.blocks,
      {
        title: "",
        type: "video",
        data: {
          headlines: [],
          sources: [],
          links: [],
        },
      },
    ],
  }))
}

 const updateBlock = (index: number, value: Block) => {
  const updated = [...program.blocks]
  updated[index] = value

  setProgram((p) => ({
    ...p,
    blocks: updated,
  }))
}

  const save = async () => {
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(program),
    });

    const text = await res.text();

    if (!res.ok) {
      console.error("Save failed raw response:", text);
      return;
    }

    console.log("SUCCESS:", text);
    alert("Saved");
  }

  return (
    <div className="mt-12 flex flex-col gap-4">

      <input className="border border-gray-500 p-2 rounded-md text-lg shadow-md"
        placeholder="Название программы"
        value={program.name}
        onChange={(e) =>
          setProgram({ ...program, name: e.target.value })
        }
      />

      <input className="border border-gray-500 p-2 rounded-md text-lg shadow-md"
        placeholder="Специальность"
        value={program.specialization}
        onChange={(e) =>
          setProgram({ ...program, specialization: e.target.value })
        }
      />

      <input className="border border-gray-500 p-2 rounded-md text-lg shadow-md"
        placeholder="Slug для ссылки в url"
        value={program.slug}
        onChange={(e) =>
          setProgram({ ...program, slug: e.target.value })
        }
      />

      <input className="border border-gray-500 p-2 rounded-md text-lg shadow-md"
        placeholder="Стоимость"
        type="number"
        value={program.price}
        onChange={(e) =>
          setProgram({ ...program, price: Number(e.target.value) })
        }
      />

      <input className="border border-gray-500 p-2 rounded-md text-lg shadow-md"
        placeholder="Образование"
        value={program.education}
        onChange={(e) =>
          setProgram({ ...program, education: e.target.value })
        }
      />

      <input className="border border-gray-500 p-2 rounded-md text-lg shadow-md"
        placeholder="Категория"
        value={program.category}
        onChange={(e) =>
          setProgram({ ...program, category: e.target.value })
        }
      />

      <input className="border border-gray-500 p-2 rounded-md text-lg shadow-md"
        placeholder="Диплом (стоимость)"
        value={program.diplom}
        onChange={(e) =>
          setProgram({ ...program, diplom: e.target.value })
        }
      />

      <input className="border border-gray-500 p-2 rounded-md text-lg shadow-md"
        placeholder="Часы программы"
        value={program.time}
        onChange={(e) =>
          setProgram({ ...program, time: e.target.value })
        }
      />

      {/* BLOCKS */}

      <button onClick={addBlock}>+ Добавить блок</button>

      {program.blocks.map((block, i) => (
        <BlockEditor
          key={i}
          block={block}
          onChange={(val) => updateBlock(i, val)}
        />
      ))}

      {/* SAVE */}

      <button onClick={save}>
        Save program
      </button>
    </div>
  );
}