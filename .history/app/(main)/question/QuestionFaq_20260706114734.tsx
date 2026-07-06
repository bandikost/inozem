'use client'

import { FAQ } from "@/data/faq";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function QuestionFaq() {
  const [opened, setOpened] = useState<number | null>(null);

  const renderFaq = (title: string, subtitle: string, start: number, end: number) => (
    <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-xl">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-prpl">
          {title}
        </h2>

        <p className="mt-2 text-gray-500">
          {subtitle}
        </p>
      </div>

      <div className="space-y-4">
        {FAQ.slice(start, end).map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300"
          >
            <button
              onClick={() =>
                setOpened((prev) => (prev === item.id ? null : item.id))
              }
              className={`flex w-full items-center justify-between p-5 text-left transition-all
                ${
                  opened === item.id
                    ? "bg-prpl text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
            >
              <span className="font-medium text-lg">
                {item.id}. {item.question}
              </span>

              <ChevronDown
                size={22}
                className={`transition-transform duration-300 ${
                  opened === item.id ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ${
                opened === item.id
                  ? "grid-rows-[1fr]"
                  : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-gray-100 bg-gray-50 p-5 text-gray-700 leading-7">
                  {item.answer}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="space-y-10">
      {renderFaq(
        "Часто задаваемые вопросы",
        "Теоретическая часть",
        0,
        5
      )}

      {renderFaq(
        "Часто задаваемые вопросы",
        "Техническая часть",
        5,
        10
      )}
    </div>
  );
}