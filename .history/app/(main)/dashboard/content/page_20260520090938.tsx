import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ProgramAdminPage from "./ProgramAdmin";

export default async function Page() { 
    const cookieStore = await cookies()
    const manager = cookieStore.get("manager")
    if (!manager) redirect("/dashboard")

    
return ( 
    <section className="flex flex-col items-center mt-30"> 
    <ProgramAdminPage />
    </section> 
) 
}