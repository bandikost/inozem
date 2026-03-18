import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { hasUserProgram } from "@/lib/programm";

export default async function SuccessPage({ searchParams }: { searchParams: { programId: string } }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/login");

  const userHasAccess = await hasUserProgram(token, Number(searchParams.programId));
  if (!userHasAccess) {
    return <div>Оплата ещё не подтверждена, подождите пару минут.</div>;
  }

  redirect(`/program/${searchParams.programId}`);
}