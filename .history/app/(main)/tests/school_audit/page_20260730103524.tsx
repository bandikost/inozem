"use client";

import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight } from "lucide-react";
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
  "Я меняю свои планы в зависимости от обстоятельств",
  "Меня раздражают события, из-за которых я вынужден менять свой распорядок дня",
  "Непредвиденные трудности порой сильно утомляют меня",
  "Я всегда контролирую ситуацию настолько, насколько это необходимо",
  "Порой я так устаю, что уже ничто не может меня заинтересовать",
  "Порой все, что я делаю, кажется мне бесполезным",
  "Я стараюсь быть в курсе всего происходящего вокруг меня",
  "Лучше синица в руках, чем журавль в небе",
  "Вечером я часто чувствую себя совершенно разбитым",
  "Я предпочитаю ставить перед собой труднодостижимые цели и добиваться их",
  "Иногда меня пугают мысли о будущем",
  "Я всегда уверен, что смогу воплотить в жизнь все, что задумал",
  "Мне кажется, я не живу полной жизнью, а только играю роль",
  "Мне кажется, что если бы в прошлом у меня было меньше разочарований и невзгод, мне было бы сейчас легче жить на свете",
  "Возникающие проблемы часто кажутся мне неразрешимыми",
  "Испытав поражение, я буду пытаться взять реванш",
  "Я люблю знакомиться с новыми людьми",
  "Когда кто-нибудь жалуется, что жизнь скучна, это значит, он просто не умеет видеть интересное",
  "Мне всегда есть чем заняться",
  "Я всегда могу повлиять на результат того, что происходит вокруг",
  "Я часто сожалею о том, что уже сделано",
  "Если проблема требует больших усилий, я предпочитаю отложить ее до лучших времен",
  "Мне трудно сближаться с другими людьми",
  "Как правило, окружающие слушают меня внимательно",
  "Если бы я мог, я бы многое изменил бы в прошлом",
  "Я довольно часто откладываю на завтра то, что трудно осуществимо, или то, в чем я не уверен",
  "Мне кажется, жизнь проходит мимо меня",
  "Мои мечты редко сбываются",
  "Неожиданности дарят мне интерес к жизни",
  "Порой мне кажется, что все мои усилия тщетны",
  "Порой я мечтаю о спокойной размеренной жизни",
  "Мне не хватает упорства закончить начатое",
  "Бывает, жизнь кажется мне скучной и бесцветной",
  "У меня нет возможности влиять на неожиданные проблемы",
  "Окружающие меня недооценивают",
  "Как правило, я работаю с удовольствием",
  "Иногда я чувствую себя лишним даже в кругу друзей",
  "Бывает, на меня наваливается столько проблем, что просто руки опускаются",
  "Друзья уважают меня за упорство и непреклонность",
  "Я охотно берусь воплощать новые идеи",
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


<button onClick={calculate} disabled={Object.keys(selected).length!==45} className="mt-8 px-6 py-3 rounded-xl bg-black text-white disabled:opacity-40">
Рассчитать результат
</button>


{result && 
    <div className="mt-10 p-6 rounded-xl bg-gray-100">

        <h2 className="text-xl font-bold mb-4">Результаты</h2>

        <p>Общая жизнестойкость: {result.total}</p>
        <p>Вовлеченность: {result.involvement}</p>
        <p>Контроль: {result.control}</p>
        <p>Принятие риска: {result.risk}</p>
        <button>Поделиться в своем профиле</button>

    </div>
}

</div>
</section>
)

}