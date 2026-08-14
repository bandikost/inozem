"use client";

import { useState } from "react";

interface Answer {
  id: number;
  text: string;
  correct: boolean;
}

interface Question {
  content_id: number;
  question_number: number;
  question: string;
  answers: string;
}

interface UserData {
  id: number;
  name: string;
  patronymic?: string | null;
  last_name: string;
  education_level?: string | null;
  age?: number | null;
  gender?: string | null;
}

interface Props {
  questions: Question[];
  nameTest: string;
  user: UserData;
}

export default function TestRunner({ questions }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<number, number[]>
  >({});

  const [finished, setFinished] = useState(false);

  const [result, setResult] = useState<{
    correct: number;
    total: number;
    percentage: number;
  } | null>(null);

  const question = questions[currentQuestion];

  const answers: Answer[] = question?.answers
    ? JSON.parse(question.answers)
    : [];

  function toggleAnswer(answerId: number) {
    setSelectedAnswers((prev) => {
      const current = prev[question.content_id] || [];

      if (current.includes(answerId)) {
        return {
          ...prev,
          [question.content_id]: current.filter(
            (id) => id !== answerId
          ),
        };
      }

      return {
        ...prev,
        [question.content_id]: [...current, answerId],
      };
    });
  }

  async function finishTest() {
  let correctCount = 0;

  questions.forEach((question) => {
    const answers: Answer[] = JSON.parse(question.answers);

    const correctAnswers = answers
      .filter((answer) => answer.correct)
      .map((answer) => answer.id)
      .sort();

    const userAnswers = (
      selectedAnswers[question.content_id] || []
    ).sort();

    const isCorrect =
      correctAnswers.length === userAnswers.length &&
      correctAnswers.every(
        (id, index) => id === userAnswers[index]
      );

    if (isCorrect) {
      correctCount++;
    }
  });

  const total = questions.length;

  const percentage =
    total > 0
      ? Math.round((correctCount / total) * 100)
      : 0;

  try {
    const response = await fetch("/api/tests-results", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user_id: user.id,

        name_test: nameTest,

        name: user.name,
        patronymic: user.patronymic ?? null,
        last_name: user.last_name,

        result: percentage,
        exp: correctCount,

        education_level:
          user.education_level ?? null,

        age:
          user.age ?? null,

        gender:
          user.gender ?? null,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Ошибка сохранения результата"
      );
    }

    console.log("Результат теста:", data);

  } catch (error) {
    console.error(
      "Ошибка сохранения результата:",
      error
    );
  }

  setResult({
    correct: correctCount,
    total,
    percentage,
  });

  setFinished(true);
}

  if (!questions.length) {
    return (
      <div className="mt-10 text-center">
        <p className="text-gray-500">
          В этом тесте пока нет вопросов.
        </p>
      </div>
    );
  }

  if (finished && result) {
    return (
      <div className="mt-10 mx-auto max-w-2xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-lg">

        <h2 className="text-3xl font-semibold text-prpl">
          Тест завершён
        </h2>

        <div className="mt-8 text-7xl font-bold text-prpl">
          {result.percentage}%
        </div>

        <p className="mt-4 text-xl text-gray-600">
          Правильных ответов:{" "}
          <strong>
            {result.correct} из {result.total}
          </strong>
        </p>

        <button
          type="button"
          onClick={() => {
            setCurrentQuestion(0);
            setSelectedAnswers({});
            setResult(null);
            setFinished(false);
          }}
          className="mt-8 rounded-xl bg-prpl px-6 py-3 text-white transition hover:opacity-90"
        >
          Пройти ещё раз
        </button>

      </div>
    );
  }

  const currentSelected =
    selectedAnswers[question.content_id] || [];

  const isLastQuestion =
    currentQuestion === questions.length - 1;

  return (
    <div className="mx-auto mt-10 max-w-3xl">

      <div className="mb-6 flex items-center justify-between">
        <span className="text-gray-500">
          Вопрос {currentQuestion + 1} из {questions.length}
        </span>

        <span className="text-gray-500">
          {Math.round(
            ((currentQuestion + 1) / questions.length) * 100
          )}%
        </span>
      </div>

      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg">

        <h2 className="text-2xl font-semibold text-prpl">
          {question.question}
        </h2>

        <div className="mt-8 flex flex-col gap-3">

          {answers.map((answer) => {
            const selected = currentSelected.includes(answer.id);

            return (
              <button
                key={answer.id}
                type="button"
                onClick={() => toggleAnswer(answer.id)}
                className={`w-full rounded-2xl border p-4 text-left transition ${
                  selected
                    ? "border-prpl bg-purple-50"
                    : "border-gray-200 hover:border-prpl"
                }`}
              >
                <div className="flex items-center gap-3">

                  <div
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                      selected
                        ? "border-prpl bg-prpl text-white"
                        : "border-gray-300"
                    }`}
                  >
                    {selected && "✓"}
                  </div>

                  <span>
                    {answer.text}
                  </span>

                </div>
              </button>
            );
          })}

        </div>

        <div className="mt-8 flex justify-between gap-4">

          <button
            type="button"
            disabled={currentQuestion === 0}
            onClick={() =>
              setCurrentQuestion((prev) => prev - 1)
            }
            className="rounded-xl border border-gray-300 px-6 py-3 disabled:opacity-40"
          >
            Назад
          </button>

          {!isLastQuestion ? (
            <button
              type="button"
              disabled={currentSelected.length === 0}
              onClick={() =>
                setCurrentQuestion((prev) => prev + 1)
              }
              className="rounded-xl bg-prpl px-6 py-3 text-white disabled:opacity-40"
            >
              Далее
            </button>
          ) : (
            <button
              type="button"
              disabled={currentSelected.length === 0}
              onClick={finishTest}
              className="rounded-xl bg-prpl px-6 py-3 text-white disabled:opacity-40"
            >
              Завершить тест
            </button>
          )}

        </div>

      </div>
    </div>
  );
}