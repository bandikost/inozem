import UserList from "@/components/Users/UserList";

export default function HelloApi() {

  return (
  <section className="flex flex-col items-center justify-center mt-20">
    <h1 className="text-prpl font-semibold">О нас</h1>
    <UserList />
  </section>
  )
}
