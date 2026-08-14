"use client";

import { useState } from "react";

interface Answer {
  id: number;
  text: string;
  correct: boolean;
}

interface Question {
  question_number: number;
  question: string;
  answers: Answer[];
}

interface Props {
  testId: number;
  initialQuestions: Question[];
}

export default function TestEditor({
  testId,
  initialQuestions,
}: Props) {
  const [questions, setQuestions] = useState<Question[]>(
    initialQuestions
  );

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  function addQuestion() {
    setQuestions((prev) => [
      ...prev,
      {
        question_number: prev.length + 1,
        question: "",
        answers: [
          {
            id: 1,
            text: "",
            correct: false,
          },
        ],
      },
    ]);
  }

  function deleteQuestion(questionIndex: number) {
    setQuestions((prev) => {
      const updated = prev.filter(
        (_, index) => index !== questionIndex
      );

      return updated.map((question, index) => ({
        ...question,
        question_number: index + 1,
      }));
    });
  }

  function updateQuestion(
    questionIndex: number,
    value: string
  ) {
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              question: value,
            }
          : question
      )
    );
  }

  function addAnswer(questionIndex: number) {
    setQuestions((prev) =>
      prev.map((question, index) => {
        if (index !== questionIndex) {
          return question;
        }

        const nextId =
          question.answers.length > 0
            ? Math.max(
                ...question.answers.map(
                  (answer) => answer.id
                )
              ) + 1
            : 1;

        return {
          ...question,
          answers: [
            ...question.answers,
            {
              id: nextId,
              text: "",
              correct: false,
            },
          ],
        };
      })
    );
  }

  function deleteAnswer(
    questionIndex: number,
    answerId: number
  ) {
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              answers: question.answers.filter(
                (answer) => answer.id !== answerId
              ),
            }
          : question
      )
    );
  }

  function updateAnswer(
    questionIndex: number,
    answerId: number,
    value: string
  ) {
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              answers: question.answers.map(
                (answer) =>
                  answer.id === answerId
                    ? {
                        ...answer,
                        text: value,
                      }
                    : answer
              ),
            }
          : question
      )
    );
  }

  function toggleCorrect(
    questionIndex: number,
    answerId: number
  ) {
    setQuestions((prev) =>
      prev.map((question, index) =>
        index === questionIndex
          ? {
              ...question,
              answers: question.answers.map(
                (answer) =>
                  answer.id === answerId
                    ? {
                        ...answer,
                        correct: !answer.correct,
                      }
                    : answer
              ),
            }
          : question
      )
    );
  }

  async function saveTest() {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/tests_creator/content",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            test_id: testId,
            questions,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Ошибка сохранения"
        );
      }

      setMessage("Тест успешно сохранён");

    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Ошибка сохранения"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto mt-10 w-full max-w-4xl">

      <div className="flex flex-col gap-8">

        {questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="rounded-3xl border border-gray-200 bg-white p-8 shadow-lg"
          >

            <div className="mb-6 flex items-center justify-between">

              <h2 className="text-xl font-semibold text-prpl">
                Вопрос №{questionIndex + 1}
              </h2>

              <button
                type="button"
                onClick={() =>
                  deleteQuestion(questionIndex)
                }
                className="text-sm text-red-500 hover:underline"
              >
                Удалить вопрос
              </button>

            </div>

            <textarea
              value={question.question}
              onChange={(e) =>
                updateQuestion(
                  questionIndex,
                  e.target.value
                )
              }
              placeholder="Введите текст вопроса..."
              className="min-h-28 w-full resize-y rounded-xl border border-gray-300 p-4 outline-none focus:border-prpl"
            />

            <div className="mt-6">

              <h3 className="mb-3 font-medium">
                Варианты ответа
              </h3>

              <div className="flex flex-col gap-3">

                {question.answers.map((answer) => (
                  <div
                    key={answer.id}
                    className={`flex items-center gap-3 rounded-xl border p-3 ${
                      answer.correct
                        ? "border-green-400 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >

                    <button
                      type="button"
                      onClick={() =>
                        toggleCorrect(
                          questionIndex,
                          answer.id
                        )
                      }
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded border ${
                        answer.correct
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {answer.correct && "✓"}
                    </button>

                    <input
                      value={answer.text}
                      onChange={(e) =>
                        updateAnswer(
                          questionIndex,
                          answer.id,
                          e.target.value
                        )
                      }
                      placeholder="Вариант ответа..."
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 outline-none focus:border-prpl"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        deleteAnswer(
                          questionIndex,
                          answer.id
                        )
                      }
                      className="text-red-500 hover:underline"
                    >
                      Удалить
                    </button>

                  </div>
                ))}

              </div>

              <button
                type="button"
                onClick={() =>
                  addAnswer(questionIndex)
                }
                className="mt-4 rounded-xl border border-prpl px-4 py-2 text-prpl hover:bg-purple-50"
              >
                + Добавить вариант ответа
              </button>

            </div>

          </div>
        ))}

      </div>

      <button
        type="button"
        onClick={addQuestion}
        className="mt-8 w-full rounded-2xl border-2 border-dashed border-gray-300 py-5 text-gray-600 transition hover:border-prpl hover:text-prpl"
      >
        + Добавить вопрос
      </button>


      <button
        type="button"
        onClick={saveTest}
        disabled={saving}
        className="mt-6 w-full rounded-2xl bg-prpl px-6 py-4 text-white transition hover:opacity-90 disabled:opacity-50"
      >
        {saving
          ? "Сохранение..."
          : "Сохранить тест"}
      </button>

      {message && (
        <p className="mt-4 text-center text-gray-600">
          {message}
        </p>
      )}

    </div>
  );
}