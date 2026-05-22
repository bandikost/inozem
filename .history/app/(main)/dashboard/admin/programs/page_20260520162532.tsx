"use client";

import { useState } from "react";
import ProgramEditor from "../components/ProgramEditor";
import { getProgramBySlug } from "@/lib/programm";

type ProgramItem = {
  id: number;
  name: string;
  slug: string;
};

interface ProgramsPageProps { 
   params: { slug: string } // типизируем что хотм получить slug из url
}

export default async function AdminProgramsPage({params} : ProgramsPageProps) {
    const {slug} = await params
    const program = await getProgramBySlug(slug)
    const [programs, setPrograms] = useState<ProgramItem[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
  


  return (
    <div style={{ padding: 20 }}>
      <h1 className="mt-27">Programs Admin</h1>

      {/* СПИСОК */}
      <div style={{ marginBottom: 20 }}>
        <h3>Programs</h3>

        <select
          onChange={(e) => setSelectedId(Number(e.target.value))}
          value={selectedId ?? ""}
        >
          <option value="">Select program</option>

          {programs.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      
      {program && (
        <ProgramEditor initialProgram={program}
        />
      )}
    </div>
  );
}