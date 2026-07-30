"use client";

import { useState } from "react";

const answers = [
  { label: "Нет", value: 0 },
  { label: "Скорее нет, чем да", value: 1 },
  { label: "Скорее да, чем нет", value: 2 },
  { label: "Да", value: 3 },
];

const questions = [
  "Я часто не уверен в собственных решениях",
  "Иногда мне кажется, что никому нет до меня дела",
  "Часто, даже хорошо выспавшись, я с трудом заставляю себя встать с постели",
  "Я постоянно занят и мне это нравится",
  "Часто я предпочитаю «плыть» по течению",
  // ... сюда все 45 вопросов
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
};


export default function HardinessTest() {

  const [selected, setSelected] = useState<Record<number,number>>({});
  const [result,setResult] = useState<any>(null);


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


    setResult({
      total:
        involvement+
        control+
        risk,

      involvement,
      control,
      risk
    });

  }


return (
<main className="max-w-5xl mx-auto px-6 py-10">

<h1 className="text-3xl font-bold mb-4">
Тест жизнестойкости С. Мадди
</h1>

<p className="text-gray-600 mb-8">
Адаптация Д. А. Леонтьева, Е. И. Рассказовой.
</p>


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

<span>
{answer.label}
</span>

</label>

))
}

</div>

</div>


))
}

</div>


<button
onClick={calculate}
disabled={
Object.keys(selected).length!==45
}
className="mt-8 px-6 py-3 rounded-xl bg-black text-white disabled:opacity-40"
>
Рассчитать результат
</button>


{
result && (

<div className="mt-10 p-6 rounded-xl bg-gray-100">

<h2 className="text-xl font-bold mb-4">
Результаты
</h2>

<p>
Общая жизнестойкость: {result.total}
</p>

<p>
Вовлеченность: {result.involvement}
</p>

<p>
Контроль: {result.control}
</p>

<p>
Принятие риска: {result.risk}
</p>


</div>

)

}


</main>
)

}