import { getTests } from "@/lib/test";

export default async function TestsTable() {
  const tests = await getTests();

  return (
    <table className="w-full text-left">
  <thead className="border-b">
    <tr>
      <th>ID</th>
      <th>Дата</th>
      <th>ФИО</th>
      <th>Тест</th>
      <th>Возраст</th>
      <th>Пол</th>
      <th>Результат</th>
    </tr>
  </thead>

  <tbody>
    {tests.map((test) => (
      <tr key={test.id} className="border-b">
        <td>{test.id}</td>
        <td>{new Date(test.created_at).toLocaleDateString("ru-RU")}</td>
        <td>
          {test.last_name} {test.name} {test.patronymic}
        </td>
        <td>{test.name_test}</td>
        <td>{test.age}</td>
        <td>{test.gender}</td>
        <td>{test.result}</td>
      </tr>
    ))}
  </tbody>
</table>
  );
}