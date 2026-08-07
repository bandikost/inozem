import { getTests } from "@/lib/test";

export default async function TestsTable() {
  const tests = await getTests();

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Результаты тестирования
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Всего пройдено тестов: {tests.length}
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
                <th className="px-6 py-4 font-medium">Возраст</th>
                <th className="px-6 py-4 font-medium">Пол</th>
                <th className="px-6 py-4 font-medium">Результат</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {tests.map((test) => (
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

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {test.age} лет
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-700">
                    {test.gender}
                  </td>

                  <td className="px-6 py-4">
                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700">
                      {test.result}
                    </span>
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