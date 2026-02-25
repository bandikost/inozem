import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import LoginForm from "./LoginForm"

export default async function Page() {
  const cookieStore = cookies()
  const token = cookieStore.get("token")?.value

  if (token) {
    redirect("/profile")
  }

  return <LoginForm />
}
