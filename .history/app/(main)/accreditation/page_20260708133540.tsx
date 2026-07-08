import { getAccred, getAccredShedule } from "@/lib/accred";
import SideButtons from "./components/SideButtons";
import LoadingLink from "@/components/Load/LoadingLink";
import { ChevronRight, GraduationCap, ShieldCheck } from "lucide-react";


export const revalidate = 3600


export const metadata = {
  title:
    "Аккредитация | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
};



export default async function Page() {

  const accred = await getAccred();
  const schedule = await getAccredShedule();



  return (

<section className="min-h-screen pb-20">


<div className="container mx-auto px-4 my-27">



{/* Breadcrumb */}

<nav className="
mb-8
flex
flex-wrap
items-center
gap-2
text-lg
text-zinc-500
">


<LoadingLink
href="/"
className="
hover:text-blue
transition
hover:underline
"
>
Главная
</LoadingLink>


<ChevronRight size={16}/>


<span className="text-zinc-800 opacity-70">
Аккредитация
</span>


</nav>





<div className="mx-auto max-w-6xl">





{/* HERO */}


<div className="
rounded-3xl
bg-green
px-6
py-12
md:px-12
shadow-xl
mb-12
">


<div className="max-w-3xl">


<div className="
flex
items-center
gap-3
text-white/90
mb-5
">

<ShieldCheck size={32}/>

<span className="
text-xl
">
Аккредитация специалистов
</span>

</div>



<h1 className="
text-white
text-3xl
md:text-5xl
font-semibold
leading-tight
">

Первичная специализированная аккредитация

</h1>



<p className="
mt-5
text-white/80
text-lg
md:text-xl
leading-relaxed
">

Процедура оценки профессиональных навыков
медицинских и фармацевтических специалистов.

</p>



</div>


</div>





{/* ОСНОВНОЙ БЛОК */}


<div className="
rounded-3xl
border
border-zinc-200
bg-white
shadow-sm
p-5
md:p-8
">


<div className="
flex
items-center
gap-3
mb-6
">


<GraduationCap
className="text-green"
size={30}
/>


<h2 className="
text-2xl
font-semibold
text-zinc-900
">

Информация по аккредитации

</h2>


</div>


<SideButtons />


</div>







{/* ОПИСАНИЕ */}


<div className="
mt-12
rounded-3xl
bg-zinc-50
border
border-zinc-200
p-6
md:p-10
">


<h2 className="
text-2xl
font-semibold
text-zinc-900
mb-5
">

Что такое первичная специализированная аккредитация?

</h2>



<div className="
space-y-5
text-lg
leading-relaxed
text-zinc-600
">


<p>

Первичная специализированная аккредитация (ПСА) —
это процедура оценки профессиональных навыков
фармацевтических и медицинских работников.

</p>


<p>

Её проходят выпускники интернатуры, ординатуры,
а также специалисты после программ
профессиональной переподготовки.

</p>


<p>

С 2022 года сведения о прохождении аккредитации
вносятся в федеральный регистр медицинских работников ЕГИСЗ.
Отдельные бумажные подтверждения больше не требуются.

</p>


</div>


</div>




</div>


</div>


</section>

  );
}