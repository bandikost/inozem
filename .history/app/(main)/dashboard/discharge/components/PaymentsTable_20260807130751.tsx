import { getPayments } from "@/lib/payments";

export default async function PaymentsTable() {
  const payments = await getPayments();

  return (
    <table>
      {/* таблица */}
    </table>
  );
}