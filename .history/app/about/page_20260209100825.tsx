import UserList from "@/components/Users/UserList";

export default function HelloApi() {

  return (
  <section className="flex flex-col ">
    <h1 className="text-prpl font-semibold mt-10 text-3xl">О нас</h1>
    <UserList />
  </section>
  )
}
