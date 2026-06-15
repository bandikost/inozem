import Link from "next/link";
import AnimatedNumber from "./components/AnimatedNumber";
import { getAllUsers } from "@/lib/users";
import { Users, BookOpen, Award, Briefcase } from "lucide-react";

export default async function SecondBlock() {
  const users = await getAllUsers();

  return (
    <section className="w-full mt-24 px-4 ">

      <div className="flex flex-col items-left text-left px-2">
        <h2 className="text-3xl font-bold text-prpl">
          Академия в цифрах
        </h2>

        <p className="mt-3 text-slate-600 !text-lg">
          Более подробная информация об академии{" "}
          <Link href="/about" className="text-prpl hover:underline">
            в разделе
          </Link>
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition">
          <div className="flex items-center justify-between">
            <Users className="text-prpl" />
            <span className="text-xs text-slate-400">Обучение</span>
          </div>

          <div className="mt-6 text-4xl font-bold text-prpl">
            <AnimatedNumber value={users.length} />
          </div>

          <p className="mt-2 text-slate-500 text-sm">
            Обучающихся
          </p>
        </div>

        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition">
          <div className="flex items-center justify-between">
            <BookOpen className="text-blue" />
            <span className="text-xs text-slate-400">Программы</span>
          </div>

          <div className="mt-6 text-4xl font-bold text-blue flex items-end gap-1">
            <AnimatedNumber value={120} />
            <span className="text-lg text-slate-500">+</span>
          </div>

          <p className="mt-2 text-slate-500 text-sm">
            Образовательных программ
          </p>
        </div>


        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition">
          <div className="flex items-center justify-between">
            <Award className="text-prpl" />
            <span className="text-xs text-slate-400">Успех</span>
          </div>

          <div className="mt-6 text-4xl font-bold text-prpl flex items-end gap-1">
            <AnimatedNumber value={96} />
            <span className="text-lg">%</span>
          </div>

          <p className="mt-2 text-slate-500 text-sm">
            Успешной аттестации
          </p>
        </div>

        <div className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg transition">
          <div className="flex items-center justify-between">
            <Briefcase className="text-blue" />
            <span className="text-xs text-slate-400">Работа</span>
          </div>

          <div className="mt-6 text-4xl font-bold text-blue flex items-end gap-1">
            <AnimatedNumber value={84} />
            <span className="text-lg">%</span>
          </div>

          <p className="mt-2 text-slate-500 text-sm">
            Трудоустройства после обучения
          </p>
        </div>

      </div>
    </section>
  );
}