import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import UsersClient from "./UsersClient"
import { getAllUsers } from "@/lib/users"

export default async function Page() {

  const cookieStore = await cookies()
  const manager = cookieStore.get("manager")

  if (!manager) redirect("/dashboard")

  const users = await getAllUsers()

  return <UsersClient users={users} />
}