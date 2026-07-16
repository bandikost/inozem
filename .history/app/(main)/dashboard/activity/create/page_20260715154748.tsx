
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ActivityCreate from "./ActivityCreate";

export default async function Page() {
  const cookieStore = await cookies();
  const manager = cookieStore.get("manager");

  if (!manager) {
    redirect("/dashboard");
  }

  return <ActivityCreate />;
}