import { getTeachers } from "@/lib/users"

export default async function Page() {
    const teachers = await getTeachers()

    const filtredTeachers = teachers.filter(t => t.isTeacher)

    return (
        <section className="flex flex-col px-4 mt-27">
        <h1 className="text-prpl font-semibold text-center">Руководство ЧОУ ДПО «Академия медицинского образования им.Ф.И.Иноземцева»</h1>
        {filtredTeachers.map(teacher => (
            <div key={teacher.id}>
                {teacher.name}
            </div>
        ))}
        </section>
    )
}