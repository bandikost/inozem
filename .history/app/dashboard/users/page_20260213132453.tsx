
type Users = { // явно типизируем приходящие данные с бд
  id: number
  name: string
  last_name: string
  patronymic: string
  phone: string
  email: string
}

async function getUsers(): Promise<Users[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users`)

  if (!res.ok) throw new Error('Failed to fetch news') // обработчик ошибки

  return res.json() // ВОЗВРАЩАЕМ JSON В СТРОКУ
}

export default async function Page() {
  const users = await getUsers()

  return (
    <section className='flex flex-col justify-center items-center '>
      <h1 className='text-3xl font-normal mt-12 text-prpl'>Новости</h1>
        <div className='border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white'>
          <ul className='grid gap-8 grid-cols-4 mt-10 px-6'>
            {users.map((n) => (
              <li key={n.id} >
                <p className='font-normal text-lg p-2'>{n.last_name} {n.name} {n.patronymic}</p>
                </li>
            ))}
          </ul>
        </div> 
    </section>
  )
}