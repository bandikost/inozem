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


function getMainResult(
  involvement: number,
  control: number,
  risk: number
) {
  const results = [
    {
      name: "Вовлеченность",
      value: involvement,
      text: "Вовлеченный"
    },
    {
      name: "Контроль",
      value: control,
      text: "Контролирующий"
    },
    {
      name: "Принятие риска",
      value: risk,
      text: "Рискованный"
    },
  ]


  return results.reduce((prev, current) =>
    current.value > prev.value ? current : prev
  )
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

{
questions.map((q,index)=>(

<div 
key={index}
className="border rounded-xl p-5"
>

<p className="font-medium mb-4">
{index+1}. {q}
</p>


<div className="grid gap-2">

{
answers.map(answer=>(

<label
key={answer.value}
className="flex gap-3 items-center cursor-pointer"
>

<input
type="radio"
name={`q-${index+1}`}
value={answer.value}
checked={
selected[index+1]===answer.value
}
onChange={()=>setSelected({
...selected,
[index+1]:answer.value
})}
/>

<span>{answer.label}</span>

</label>

))
}

</div>

</div>


))
}

</div>


<button onClick={calculate} disabled={Object.keys(selected).length!==45} className="mt-8 px-6 py-3 rounded-xl bg-black text-white disabled:opacity-40">
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