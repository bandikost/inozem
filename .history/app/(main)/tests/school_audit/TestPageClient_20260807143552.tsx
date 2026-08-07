"use client";

import { UserRow } from "@/app/interface/user";
import LoadingLink from "@/components/Load/LoadingLink";
import { questions } from "@/lib/test_result/school_audit/test";
import { ChevronRight } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/Toast/ToastProvider";


const answers = [
  { label: "Нет", value: 0 },
  { label: "Скорее нет, чем да", value: 1 },
  { label: "Скорее да, чем нет", value: 2 },
  { label: "Да", value: 3 },
];



const reverse = new Set([
  1,2,3,5,6,7,8,10,11,13,14,16,18,19,20,
  26,27,28,30,31,32,33,35,36,37,38,39,40,
  42,43
]);

const scales = {
  involvement: {
    direct: [4,12,22,23,24,29,41],
    reverse: [2,3,10,11,14,28,32,37,38,40,42],
  },
  control: {
    direct: [9,15,17,21,25,44],
    reverse: [1,5,6,8,16,20,27,31,35,39,43],
  },
  risk: {
    direct: [34,45],
    reverse: [7,13,18,19,26,30,33,36],
  },
}

interface Props {
  user: UserRow
}




export default function TestPageClient({user} : Props) {

  const [selected, setSelected] = useState<Record<number,number>>({})
  const [educationLevel, setEducationLevel] = useState("")
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [result,setResult] = useState<any>(null)
  const toast = useToast()
  const [completed, setCompleted] = useState(false);
  const [savedResult, setSavedResult] = useState(null);

useEffect(() => {
  async function check() {
    const res = await fetch(
      `/api/tests_results/check?userId=${user.id}&nameTest=${encodeURIComponent(
        "Тест жизнестойкости С. Мадди"
      )}`
    );

    const data = await res.json();

    setCompleted(data.completed);
    setSavedResult(data.result);
  }

  check();
}, [user.id]);

  if (completed) {
  return (
    <section className="min-h-screen">
    <div className="container mx-auto px-2 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />

             <LoadingLink href="/programs" className="shrink-0 hover:text-blue transition hover:underline">
              Образование
            </LoadingLink>

            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Тестирование "Школа аудита"
        </span>
      
      </nav>
      <h1>Тест жизнестойкости С. Мадди</h1>

      <div className="rounded-xl border border-gray-200 shadow-2xl p-6 mt-8">
        <h2 className="text-xl font-semibold">
          ✅ Вы уже прошли этот тест
        </h2>

        <p className="mt-3">
          Посмотреть результат можно в личном кабинете.
        </p>

        <LoadingLink
          href="/profile"
          className="button-more mt-5"
        >
          Перейти в профиль
        </LoadingLink>
      </div>
      </div>
    </section>
  );
}

   const handleSendResult = async () => {
  try {
    const response = await fetch("/api/tests_results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      user_id: user.id,
      name_test: "Тест жизнестойкости С. Мадди",

      name: user.name,
      patronymic: user.patronymic,
      last_name: user.last_name,

      education_level: educationLevel,
      age: Number(age),
      gender,

      result: result.type,
      exp: result.total,
    }),
    });


    const data = await response.json()


    if (!response.ok) {
       toast.error("Ошибка сохранения результата");
      throw new Error(data.error || "Ошибка сохранения результата");
    }

      toast.success("Вы успешно разместили запись в личном кабинете!");

    setTimeout(() => {
      redirect("/profile")
    }, 1500)
    

  } catch (error) {
    toast.error("Ошибка получения результата");
  }
}


function getMainResult(total: number) {
  if (total >= 99) {
    return {
      type: "Высокая жизнестойкость",
      description:
        "Вы хорошо справляетесь со стрессовыми ситуациями, сохраняете вовлеченность, ощущение контроля и готовы воспринимать трудности как источник опыта."
    };
  }

  if (total >= 62) {
    return {
      type: "Средняя жизнестойкость",
      description:
        "Ваш уровень жизнестойкости соответствует средним нормативным значениям. В большинстве ситуаций вы способны эффективно справляться с трудностями."
    };
  }

  return {
    type: "Низкая жизнестойкость",
    description:
      "В стрессовых ситуациях может возникать ощущение беспомощности, снижение вовлеченности и уверенности в собственных силах."
  };
}



  function calculate(){

    let scores: Record<number,number> = {};

    Object.entries(selected).forEach(([id,value])=>{

      const num = Number(id);

      scores[num] = reverse.has(num)
        ? 3 - value
        : value;

    });


    function getScale(
      direct:number[],
      reverse:number[]
    ){

      return [
        ...direct,
        ...reverse
      ]
      .reduce((sum,id)=>sum+(scores[id] ?? 0),0);

    }


    const involvement = getScale(
      scales.involvement.direct,
      scales.involvement.reverse
    );

    const control = getScale(
      scales.control.direct,
      scales.control.reverse
    );

    const risk = getScale(
      scales.risk.direct,
      scales.risk.reverse
    );

       const main = getMainResult(
  involvement,
  control,
  risk
);


setResult({
  type: main.text,
  total: involvement + control + risk,
  involvement,
  control,
  risk
})


   

  }


return (
<section className="min-h-screen">
    <div className="container mx-auto px-4 my-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500">
      
            <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
              Главная
            </LoadingLink>
      
            <ChevronRight size={14} className="shrink-0" />

             <LoadingLink href="/programs" className="shrink-0 hover:text-blue transition hover:underline">
              Образование
            </LoadingLink>

            <ChevronRight size={14} className="shrink-0" />
      
        <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
          Тестирование "Школа аудита"
        </span>
      
      </nav>

<h1 className="text-3xl font-bold mb-4">
Тест жизнестойкости С. Мадди
</h1>

<p className="text-gray-600 mb-8">Адаптация Д. А. Леонтьева, Е. И. Рассказовой.</p>


<div className="space-y-6">

  <div className="mb-10 border border-gray-300 shadow-md rounded-xl p-6">

  <h2 className="text-xl text-prpl mb-6">
    Информация о респонденте
  </h2>

  <div className="grid gap-6">

    <div>
      <label
        htmlFor="education"
        className="mb-2 block !font-medium"
      >
        1. Уровень образования
      </label>

      <select
        id="education"
        value={educationLevel}
        onChange={(e) => setEducationLevel(e.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3"
      >
        <option value="">
          Выберите уровень образования
        </option>

        <option value="Высшее медицинское">
          Высшее медицинское
        </option>

        <option value="Среднее профессиональное">
          Среднее профессиональное
        </option>

        <option value="Без медицинского образования">
          Без медицинского образования
        </option>
      </select>
    </div>

    <div>
      <label
        htmlFor="age"
        className="mb-2 block font-medium"
      >
        2. Возраст (полных лет)
      </label>

      <input
        id="age"
        type="number"
        min="1"
        max="120"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        placeholder="Введите возраст"
        className="w-full rounded-lg border border-gray-300 px-4 py-3"
      />
    </div>

    <div>
      <p className="mb-3 font-medium">
        3. Пол респондента
      </p>

      <div className="flex flex-wrap gap-5">

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="gender"
            value="Мужской"
            checked={gender === "Мужской"}
            onChange={(e) => setGender(e.target.value)}
          />

          <span>Мужской</span>
        </label>


        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="radio"
            name="gender"
            value="Женский"
            checked={gender === "Женский"}
            onChange={(e) => setGender(e.target.value)}
          />

          <span>Женский</span>
        </label>

      </div>
    </div>

  </div>

</div>

{questions.map((q,index)=>(

  <div key={index} className="border border-gray-300 shadow-md rounded-xl p-5">
    <p className="!font-medium mb-1 text-prpl">{index + 1}. {q}</p>
    <hr className="border border-gray-200" />

    <div className="grid gap-2 mt-4">
      {answers.map(answer=>(
        <label key={answer.value} className="flex gap-3 items-center cursor-pointer">
          <input type="radio" name={`q-${index + 1}`} value={answer.value} checked={selected[index + 1]===answer.value} onChange={()=>setSelected({...selected, [index + 1]:answer.value })} />
          <span>{answer.label}</span>
        </label>
      ))
    }

  </div>

</div>
))}

</div>


<button
  onClick={calculate}
  disabled={
    Object.keys(selected).length !== 45 ||
    !educationLevel ||
    !age ||
    !gender
  }
  className="mt-8 px-6 py-3 rounded-xl bg-black text-white disabled:cursor-not-allowed disabled:opacity-40"
>
  Рассчитать результат
</button>

{result && 
    <div className="mt-10 p-6 rounded-xl bg-gray-100">

        <h2 className="text-xl font-bold mb-4">Результаты</h2>
        <p>Основная характеристика: {result.type}</p>
        <p>Общая жизнестойкость: {result.total}</p>
        <p>Вовлеченность: {result.involvement}</p>
        <p>Контроль: {result.control}</p>
        <p>Принятие риска: {result.risk}</p>
        <button className="mt-4 button-more" onClick={() => handleSendResult()}>Поделиться в своем профиле</button>

    </div>
}

</div>
</section>
)

}