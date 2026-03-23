import { cookies } from "next/headers";
import AddProgramForm from "./AddProgramForm";
import { redirect } from "next/navigation";

export default async function Page() { 
    const cookieStore = await cookies()
    const manager = cookieStore.get("manager")
    if (!manager) redirect("/dashboard")

    
return ( 
    <section className="flex flex-col items-center mt-30"> 
    <h1 className="text-prpl">Программы обучения | Админ</h1> 
    <p>Добавление новой программы</p>
    <AddProgramForm />
    </section> 
) 
}