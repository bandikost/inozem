import { getQuestions } from "@/lib/questions";
import Link from "next/link";


export default async function QuestionTable() {
  const question = await getQuestions()

   const sortedQuestion = [...question].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  )

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Вопросы
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Всего Вопросов: {question.length}
        </p>
      </div>


      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-500">
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Дата</th>
                <th className="px-6 py-4">Пользователь</th>
                <th className="px-6 py-4">Вопрос</th>
                <th className="px-6 py-4">К вопросу на почту</th>
              </tr>
            </thead>


            <tbody className="divide-y divide-gray-100">
              {sortedQuestion.map((q) => (
                <tr
                  key={q.id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 text-sm text-gray-500">
                    #{q.id}
                  </td>


                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(q.created_at).toLocaleDateString("ru-RU")}
                  </td>


                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                        {q.last_name} {q.name} {q.patronymic}
                    </div>

                    <div className="text-sm text-gray-500">
                        {q.email}
                    </div>  

                    <div className="text-sm text-gray-500">
                        {q.phone}
                    </div>
                    </td>


                  <td className="px-6 py-4 text-sm text-gray-500">
                    {q.question}
                  </td>

                   <td className="px-6 py-4 text-xs text-gray-500">
                    <Link target="_blank" href="https://mail.360.yandex.ru/?uid=229873017#folder/66">Перейти в почту</Link>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}