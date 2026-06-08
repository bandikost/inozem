import AccredResult from "./AccredResult"
import SideButtons from "./components/SideButtons"

export const dynamic = "force-dynamic";

export const metadata = {
    title: "Аккредитация | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»"
}


export default function Page() {
   
return (
    <section className="flex flex-col px-6">
      <h2 className="text-green font-semibold mt-27 text-center">Первичная специализированная аккредитация</h2>
    
        <SideButtons />

        <div className="w-full border border-gray-300 mt-8 rounded shadow-2xl bg-white px-6 py-3">
            <h2 className="text-xl text-center text-green mt-3">Результаты первичной специализированной аккредитации</h2>
            
            <AccredResult />
        </div>

        <p className="mt-4 !text-sm mt-15 text-zinc-800">Первичная специализированная аккредитация (ПСА)– это процедура оценки профессиональных навыков фармацевтических или медицинских работников. Ее проходят выпускники интернатуры, ординатуры, а также врачи и специалисты со средним профессиональным образованием после завершения дополнительного профессионального образования по программам профессиональной переподготовки.</p>
        <p className="mt-4 !text-sm mb-10 text-zinc-800">Внимание! С 2022 года для дальнейшей работы Вам не требуется получение свидетельства об аккредитации специалиста, выписки из ЕГИСЗ или выписки из протокола заседания центральной аккредитационной комиссии (часть 3.1 статьи 69 Федерального закона от 21.11.2011 № 323-ФЗ). Сведения о Вашем прохождении аккредитации вносятся в федеральный регистр медицинских работников ЕГИСЗ, доступ в который есть у Вашего работодателя.</p>

    </section> 
    )
}