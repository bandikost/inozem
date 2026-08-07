import { getPayments } from "@/lib/payments"


export default async function PaymentsTable() {
  const payments = await getPayments();

    const statusStyle: Record<string, string> = {
  NEW: "bg-yellow-50 text-yellow-700",
  CONFIRMED: "bg-green-50 text-green-700",
  REJECTED: "bg-red-50 text-red-700",
  REFUNDED: "bg-gray-100 text-gray-700",
};

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Платежи
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Всего операций: {payments.length}
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
                <th className="px-6 py-4">Сумма</th>
                <th className="px-6 py-4">Статус</th>
                <th className="px-6 py-4">Order ID</th>
              </tr>
            </thead>


            <tbody className="divide-y divide-gray-100">
              {payments.map((payment) => (
                <tr
                  key={payment.id}
                  className="hover:bg-gray-50 transition"
                >

                  <td className="px-6 py-4 text-sm text-gray-500">
                    #{payment.id}
                  </td>


                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(payment.created_at).toLocaleDateString("ru-RU")}
                  </td>


                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                        {payment.last_name} {payment.first_name}
                    </div>

                    <div className="text-sm text-gray-500">
                        {payment.email}
                    </div>  

                    <div className="text-sm text-gray-500">
                        {payment.phone}
                    </div>
                    </td>


                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {payment.amount ? payment.amount.toLocaleString("ru-RU") : "—"} ₽
                  </td>


                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                        statusStyle[payment.status]
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>


                  <td className="px-6 py-4 text-xs text-gray-500">
                    {payment.order_id}
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