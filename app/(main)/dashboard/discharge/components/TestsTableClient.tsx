"use client";

import { useState } from "react";

import TestsExport from "./TestsExport";
import { ALL_SPECIALTIES } from "@/data/specialties";

type Test = {
  id: number;
  user_id: number;
  name_test: string;
  name: string;
  patronymic: string | null;
  last_name: string;
  result: number | string;
  specialization: string | null;
  created_at: string;
};

type Props = {
  tests: Test[];
};

export default function TestsTableClient({ tests }: Props) {
  const [specialty, setSpecialty] = useState<string>(
    "Все специальности"
  )

  const filteredTests =
  specialty === "Все специальности"
    ? tests
    : tests.filter(
        (test) => test.specialization === specialty
      )

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Результаты тестирования
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 mt-5">
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="
              w-full sm:max-w-md
              rounded-2xl border border-gray-200
              bg-white px-4 py-3
              text-sm text-gray-700
              outline-none transition
              focus:border-green-500
              focus:ring-4 focus:ring-green-500/10
            "
          >
            {ALL_SPECIALTIES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>

          <TestsExport tests={filteredTests} specialty={specialty} />
        </div>

        <p className="mt-3 text-sm text-gray-500">
          Найдено результатов: {filteredTests.length}
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-500">
                <th className="px-6 py-4 font-medium">ID</th>
                <th className="px-6 py-4 font-medium">Дата</th>
                <th className="px-6 py-4 font-medium">ФИО</th>
                <th className="px-6 py-4 font-medium">Тест</th>
                <th className="px-6 py-4 font-medium">Результат</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredTests.map((test) => (
                <tr
                  key={test.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-gray-500">
                    #{test.id}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(test.created_at).toLocaleDateString("ru-RU")}
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {test.last_name} {test.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {test.patronymic}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600">
                      {test.name_test}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        Number(test.result) >= 70
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {Number(test.result) >= 70
                        ? `${test.result} Сдано`
                        : `${test.result} Не сдано`}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredTests.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-gray-400"
                  >
                    По выбранной специальности результатов нет
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}