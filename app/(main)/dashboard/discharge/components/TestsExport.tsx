
"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import * as XLSX from "xlsx-js-style";

type TestResult = {
  id: number;
  user_id: number;
  name_test: string;
  name: string;
  patronymic: string | null;
  last_name: string;
  result: number | string;
  created_at: string;
};

export default function TestsExport() {
  const [loading, setLoading] = useState(false);

  async function downloadExcel() {
    try {
      setLoading(true);

      const response = await fetch("/api/tests_results/export");

      if (!response.ok) {
        throw new Error("Не удалось получить результаты тестов");
      }

      const tests: TestResult[] = await response.json();

      if (!tests.length) {
        alert("Нет результатов для выгрузки");
        return;
      }

      const usersMap = new Map<
        number,
        { user_id: number; fio: string }
      >();

      for (const test of tests) {
        if (!usersMap.has(test.user_id)) {
          usersMap.set(test.user_id, {
            user_id: test.user_id,
            fio: [
              test.last_name,
              test.name,
              test.patronymic,
            ]
              .filter(Boolean)
              .join(" "),
          });
        }
      }

      const users = [...usersMap.values()].sort((a, b) =>
        a.fio.localeCompare(b.fio, "ru")
      );

   
      const testNames = [
        ...new Set(tests.map((test) => test.name_test)),
      ].sort((a, b) => a.localeCompare(b, "ru"));


      const sortedResults = [...tests].sort(
        (a, b) =>
          new Date(b.created_at).getTime() -
          new Date(a.created_at).getTime()
      );

      const resultsMap = new Map<string, TestResult>();

      for (const test of sortedResults) {
        const key = `${test.user_id}_${test.name_test}`;

        if (!resultsMap.has(key)) {
          resultsMap.set(key, test);
        }
      }


      const data: (string | number)[][] = [
        ["Название теста", ...users.map((user) => user.fio)],
      ];

      for (const testName of testNames) {
        const row: (string | number)[] = [testName];

        for (const user of users) {
          const result = resultsMap.get(
            `${user.user_id}_${testName}`
          );

          if (!result) {
            row.push("");
          } else {
            row.push(
              Number(result.result) >= 70
                ? "Сдано"
                : "Не сдано"
            );
          }
        }

        data.push(row);
      }

      const worksheet = XLSX.utils.aoa_to_sheet(data);

      for (let col = 0; col <= users.length; col++) {
        const cellAddress = XLSX.utils.encode_cell({
          r: 0,
          c: col,
        });

        worksheet[cellAddress].s = {
          font: {
            bold: true,
            color: { rgb: "FFFFFF" },
            sz: 11,
          },
          fill: {
            patternType: "solid",
            fgColor: { rgb: "334155" },
          },
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true,
          },
          border: {
            bottom: {
              style: "thin",
              color: { rgb: "CBD5E1" },
            },
          },
        };
      }


      for (let r = 1; r < data.length; r++) {
        for (let c = 1; c <= users.length; c++) {
          const address = XLSX.utils.encode_cell({
            r,
            c,
          });

          const cell = worksheet[address];

          if (!cell || !cell.v) continue;

          const passed = cell.v === "Сдано";

          cell.s = {
            fill: {
              patternType: "solid",
              fgColor: {
                rgb: passed ? "DCFCE7" : "FEE2E2",
              },
            },
            font: {
              bold: true,
              color: {
                rgb: passed ? "166534" : "991B1B",
              },
            },
            alignment: {
              horizontal: "center",
              vertical: "center",
            },
            border: {
              bottom: {
                style: "thin",
                color: { rgb: "E2E8F0" },
              },
              right: {
                style: "thin",
                color: { rgb: "E2E8F0" },
              },
            },
          };
        }
      }

      worksheet["!cols"] = [
        { wch: 40 },
        ...users.map((user) => ({
          wch: Math.min(Math.max(user.fio.length + 4, 24), 36),
        })),
      ];

      worksheet["!rows"] = [
        { hpt: 42 },
        ...testNames.map(() => ({ hpt: 26 })),
      ];


      worksheet["!freeze"] = {
        xSplit: 1,
        ySplit: 1,
        topLeftCell: "B2",
        activePane: "bottomRight",
        state: "frozen",
      };

      worksheet["!autofilter"] = {
        ref: XLSX.utils.encode_range({
          s: { r: 0, c: 0 },
          e: { r: data.length - 1, c: users.length },
        }),
      };

      const workbook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Результаты тестов"
      );

      XLSX.writeFile(workbook, "Результаты_тестирования.xlsx");
    } catch (error) {
      console.error("Ошибка экспорта:", error);
      alert("Не удалось сформировать Excel-файл");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
  type="button"
  onClick={downloadExcel}
  disabled={loading}
  className="
    group inline-flex items-center justify-center gap-2.5
    rounded-2xl border border-green-700/10
    bg-gradient-to-r from-green-600 to-emerald-600
    px-5 py-3 my-5
    w-full
    text-sm font-semibold text-white
    shadow-md shadow-green-600/20
    transition-all duration-200 ease-out
    hover:-translate-y-0.5
    hover:from-green-700 hover:to-emerald-700
    hover:shadow-lg hover:shadow-green-600/25
    active:translate-y-0 active:scale-[0.98]
    disabled:pointer-events-none disabled:opacity-60
    disabled:shadow-none
    focus-visible:outline-none
    focus-visible:ring-4 focus-visible:ring-green-500/25
  ">
  
  <span>
    {loading ? "Формирование Excel..." : "Выгрузить в Excel"}
  </span>
  {!loading && (
    <Download />
  )}
</button>
  );
}
