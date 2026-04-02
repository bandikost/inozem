'use client'

import ProgramsButtons from "@/components/ui/Buttons/ProgramsButtons";
import SidesButtons from "@/components/ui/Buttons/SidesButtons";
import InputPrograms from "@/components/ui/inputPrograms";
import { getPrograms } from "@/lib/programm";

export default async function Page() {
  const programs = await getPrograms();

  return (
    <>
      {/* Фиксированные кнопки вне всех контейнеров */}
      <ProgramsButtons />

      <main className="w-full max-w-[1200px] mx-auto min-h-screen px-4">
        <h1 className="text-3xl font-semibold text-prpl text-center mt-10">
          Программы обучения
        </h1>
        <SidesButtons />
        <InputPrograms programs={programs} />
      </main>
    </>
  );
}