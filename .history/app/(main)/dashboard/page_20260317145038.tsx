import Link from "next/link";


export default async function Page() {


    return (
         <div className="max-w-[400px] mx-auto">
        <h1 className="text-prpl font-semibold text-3xl text-center">Авторизация</h1>
        <p className="text-center mt-4 text-zinc-800 text-lg">ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»</p>

      <form className="flex flex-col gap-4 mt-10 border border-zinc-400 rounded-xl p-4 shadow-2xl">
        <input
         className="border border-zinc-400 p-1.5 rounded mt-4 text-zinc-700"
          name="email"
          type="email"
          placeholder="Почта"
          value={""}
        
          required
        />

        <input
         className="border border-zinc-400 p-1.5 rounded text-zinc-700"
          name="password"
          type="password"
          placeholder="Пароль"
          value={""}
 
          required
        />

        <button type="submit" disabled={loading} className="flex items-center px-4 py-2 bg-prpl text-white text-center rounded flex cursor-pointer hover:bg-prpl">
          {loading ? "Авторизация..." : "Авторизация"}
        </button>
      </form>
   
        <p className="ml-4 mt-4 text-zinc-700">У вас еще нет аккаунта? <Link className="text-blue-500 hover:text-blue-700" href={"/register"}>Регистрация</Link></p>
        <p className="ml-4 mt-2 text-zinc-700">Вернуться на <Link className="text-blue-500 hover:text-blue-700" href={"/"}>главную</Link> </p>
    
    {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
    )
}