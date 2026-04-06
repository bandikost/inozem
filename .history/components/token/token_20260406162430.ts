import { cookies } from "next/headers"
import { redirect } from "next/navigation" 

export default async function TokenCheck(): Promise<string> { 
    const cookieStore = await cookies() 
    const token = cookieStore.get("token")?.value 
     

    return token    
}