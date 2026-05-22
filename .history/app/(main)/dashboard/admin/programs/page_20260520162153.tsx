"use client";

import { useEffect, useState } from "react";
import ProgramEditor from "../components/ProgramEditor";

type ProgramItem = {
  id: number;
  name: string;
  slug: string;
};

export default function AdminProgramsPage() {
  const [programs, setPrograms] = useState<ProgramItem[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [program, setProgram] = useState<any>(null);

  // 1. загрузка списка программ
  useEffect(() => {
    fetch("/api/admin/programs")
      .then((r) => r.json())
      .then(setPrograms);
  }, []);

  // 2. загрузка конкретной программы
  useEffect(() => {
    if (!selectedId) return;

    fetch(`/api/admin/programs/${selectedId}`)
      .then((r) => r.json())
      .then(setProgram);
  }, [selectedId]);

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