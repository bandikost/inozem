
import { db } from "@/lib/db"
import { getPrograms } from "@/lib/programm"
import Link from "next/link"

export default async function ContentPage() {

    const program = await getPrograms()

  return (
    <div style={{ padding: 20 }}>
      <h1>Content Dashboard</h1>

      <div style={{ marginTop: 20 }}>
        
          <ul>{program.map(p => (
             <li key={p.id}>{p.name}</li>
          ))}
           
          </ul>

        
          
        
      </div>
    </div>
  )
}