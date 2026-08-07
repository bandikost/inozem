import { getActivityUsers } from "@/lib/activity";

export default async function ActivityUsersTable() {
  const users = await getActivityUsers();

  return (
    <div className="w-full">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Заявки на мероприятия
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Всего участников: {users.length}
        </p>
      </div>


      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead className="bg-gray-50">
              <tr className="text-sm text-gray-500">

                <th className="px-6 py-4">
                  ID
                </th>

                <th className="px-6 py-4">
                  Мероприятие
                </th>

                <th className="px-6 py-4">
                  ФИО
                </th>

                <th className="px-6 py-4">
                  Контакты
                </th>

                <th className="px-6 py-4">
                  Город
                </th>

                <th className="px-6 py-4">
                  Образование
                </th>

                <th className="px-6 py-4">
                  Дата заявки
                </th>

              </tr>
            </thead>


            <tbody className="divide-y divide-gray-100">

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 text-sm text-gray-500">
                    #{user.id}
                  </td>


                  <td className="px-6 py-4">

                    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {user.activity_name}
                    </span>

                  </td>


                  <td className="px-6 py-4">

                    <div className="font-medium text-gray-900">
                      {user.last_name} {user.name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {user.patronymic}
                    </div>

                  </td>


                  <td className="px-6 py-4">

                    <div className="text-sm text-gray-700">
                      {user.email}
                    </div>

                    <div className="text-sm text-gray-500">
                      {user.phone}
                    </div>

                  </td>


                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.city || "—"}
                  </td>


                  <td className="px-6 py-4 text-sm text-gray-700">
                    {user.education_level}
                  </td>


                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(user.created_at).toLocaleDateString("ru-RU")}
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