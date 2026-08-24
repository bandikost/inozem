import { getApplication } from "@/lib/application";
import Link from "next/link";


export default async function LearningTable() {
  const application = await getApplication()

  const sortedApplication = [...application].sort(
    (a, b) =>
      new Date(b.created_at).getTime() -
      new Date(a.created_at).getTime()
  )

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Заявки
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Всего заявок: {application.length}
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
                <th className="px-6 py-4">Программа</th>
                <th className="px-6 py-4">К вопросу на почту</th>
              </tr>
            </thead>


            <tbody className="divide-y divide-gray-100">
              {sortedApplication.map((a) => (
                <tr
                  key={a.id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 text-sm text-gray-500">
                    #{a.id}
                  </td>


                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(a.created_at).toLocaleDateString("ru-RU")}
                  </td>


                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                        {a.last_name} {a.name} {a.patronymic}
                    </div>

                    <div className="text-sm text-gray-500">
                        {a.email}
                    </div>  

                    <div className="text-sm text-gray-500">
                        {a.phone}
                    </div>
                    </td>


                  <td className="px-6 py-4 text-xs text-gray-500">
                    
                    <div className="text-sm text-gray-500">
                        {a.programm_name}
                    </div> 
                    <hr />
                    <div className="text-sm text-gray-500 !font-bold py-2">
                        {a.education_level}
                    </div> 
                    <hr />
                    <div className="text-sm text-gray-500">
                        {a.specialization}
                    </div> 
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