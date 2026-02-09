import UserList from "@/components/Users/UserList";

export default function HelloApi() {

  return (
  <section className="flex flex-col items-center justify-center ">
    <h1 className="text-prpl font-semibold mt-20">О нас</h1>
    <UserList />
  </section>
  )
}
