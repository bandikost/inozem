import { getActivity } from "@/lib/activity";

export default async function ActivityTable() {
  const activities = await getActivity();

  return (
    <div className="w-full">

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Мероприятия
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Всего мероприятий: {activities.length}
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
                  Название
                </th>

                <th className="px-6 py-4">
                  Преподаватель
                </th>

                <th className="px-6 py-4">
                  Цена
                </th>

                <th className="px-6 py-4">
                  Год
                </th>

                <th className="px-6 py-4">
                  Дата создания
                </th>

              </tr>
            </thead>


            <tbody className="divide-y divide-gray-100">

              {activities.map((activity) => (

                <tr
                  key={activity.id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 text-sm text-gray-500">
                    #{activity.id}
                  </td>


                  <td className="px-6 py-4">

                    <div className="font-medium text-gray-900">
                      {activity.name}
                    </div>

                    {activity.title && (
                      <div className="text-sm text-gray-500 max-w-md truncate">
                        {activity.title}
                      </div>
                    )}

                  </td>


                  <td className="px-6 py-4 text-sm text-gray-700">
                    {activity.teacher || "—"}
                  </td>


                  <td className="px-6 py-4">

                    {activity.price ? (
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700">
                        {activity.price.toLocaleString("ru-RU")} ₽
                      </span>
                    ) : (
                      <span className="text-gray-400">
                        Бесплатно
                      </span>
                    )}

                  </td>


                  <td className="px-6 py-4 text-sm text-gray-700">
                    {activity.year || "—"}
                  </td>


                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(activity.created_at).toLocaleDateString("ru-RU")}
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