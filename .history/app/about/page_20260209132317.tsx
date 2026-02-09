"use client"

import { File, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [active, setActive] = useState(false)

  const handleOpen = () => setActive(prev => !prev)

  return (
  <section className="flex flex-col">
    <h1 className="text-prpl font-semibold mt-10 text-3xl text-center">О нас</h1>

    <div className="border-2 border-dotted border-zinc-300 pb-4 mt-8 rounded shadow-2xl bg-white px-6 py-3">
      <h2 className="text-prpl font-semibold text-2xl mt-2">Наши особенности</h2>

      <ul className="grid gap-1 mt-4 text-md">
        <li>1. Академия расположена в историческом центре Санкт-Петербурга</li>
        <li>2. Гибкая ценовая политика и грамотный менеджмент позволяют нам всегда находить компромиссы и идти вперед вместе с Вами</li>
        <li>3. Уникальное предложение для работодателей по организации и проведению входного обучения новых сотрудников</li>
        <li>4. Возможность дистанционного обучения сотрудников</li>
        <li>5. Современное симуляционное оборудование</li>
        <li>6. Просторный лекционный зал</li>
        <li>7. Мы оказываем услуги по повышению уровня квалификации врачебного и среднего медицинского персонала</li>
        <li>8. Все услуги лицензированы в соответствии с Российским законодательством</li>
        <li>9. Перечень услуг включает проведение стажировок, циклов повышения квалификации, тренингов, семинаров, мастер-классов, конференций и прочее</li>
      </ul>

      
    </div>
    <div className="grid grid-cols-2 gap-8">
      <div className="flex flex-col mt-8">
        <h1 className="text-prpl font-semibold text-3xl mt-2 flex items-center px-6"><Info className="mr-2" />Юридическая информация</h1>  
        <div className="border-2 border-dotted border-zinc-300 pb-4 mt-8 rounded shadow-2xl bg-white px-6 py-3">
        

          <h2 className="text-prpl font-semibold text-2xl mt-8">Полное наименование образовательной организации</h2>
          <hr className="border-zinc-300 w-full h-2" />
          <p className="text-default text-md mt-2">Частное образовательное учреждение дополнительного профессионального образования «Академия медицинского образования имени Федора Ивановича Иноземцева»</p>

          <h2 className="text-prpl font-semibold text-2xl mt-8">Сокращенное наименование</h2>
          <hr className="border-zinc-300 w-full h-2" />
          <p className="text-default text-md mt-2">ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»</p>

          <h2 className="text-prpl font-semibold text-2xl mt-8">Полное наименование образовательной организации на английском языке</h2>
          <hr className="border-zinc-300 w-full h-2" />
          <p className="text-default text-md mt-2">Private Educational Institution of Supplementary Education «Academy of Medical Education named after F.I.Inozemtsev»</p>

          <h2 className="text-prpl font-semibold text-2xl mt-8">Дата создания образовательной организации</h2>
          <hr className="border-zinc-300 w-full h-2" />
          <p className="text-default text-md mt-2">27 января 2009 года</p>

          <h2 className="text-prpl font-semibold text-2xl mt-8">Лицензия, аккредитация</h2>
          <hr className="border-zinc-300 w-full h-2" />
          <p className="text-default text-md mt-2">Лицензия на право ведения образовательной деятельности - регистрационный № 2337, выдана Комитетом по образованию Правительства Санкт-Петербурга 16 ноября 2016 года, серия 78Л01 №0000752</p>

          <h2 className="text-prpl font-semibold text-2xl mt-8">Учредитель образовательной организации</h2>
          <hr className="border-zinc-300 w-full h-2" />
          <p className="text-default text-md mt-2">Акционерное общество «Современные медицинские технологии», являющееся юридическим лицом по законодательству РФ, место нахождения: 190013, Санкт-Петербург, Московский пр., 22, зарегистрированное Межрайонной инспекцией Федеральной налоговой службы №15 по Санкт-Петербургу 05.06.2008г. за основным государственным регистрационным номером 1089847230417, о чем выдано свидетельство Серия 78 №006981724</p>

          <h2 className="text-prpl font-semibold text-2xl mt-8">Директор Академии</h2>
          <hr className="border-zinc-300 w-full h-2" />
          <p className="text-default  text-md mt-2">Кощеева Наталья Александровна</p>

        </div>
      </div>

      <div className="flex flex-col mt-8">
        <h1 className="text-blue font-semibold text-3xl mt-2 flex items-center px-6"><File className="mr-2"/>Документы Академии</h1>
        <div className="border-2 border-dotted border-zinc-300 pb-4 mt-8 rounded shadow-2xl bg-white px-6 py-3">      

          <h2 className="text-blue font-semibold text-2xl mt-8">Уставные документы и лицензия на право ведения образовательной деятельности:</h2>
          <hr className="border-zinc-300 w-full h-2" />
            <ul className="grid gap-4 underline mt-4 text-blue">
              <li><Link href={"/files/about/ustav_2017.pdf"} target="_blank" rel="noopener noreferrer">Устав Академии от 2018 года</Link></li>
              <li><Link href={"/files/about/litsenz.pdf"} target="_blank" rel="noopener noreferrer">Лицензия на осуществление образовательной деятельности</Link></li>
              <li><Link href={"/files/about/reester.pdf"} target="_blank" rel="noopener noreferrer">Выписка из реестра лицензий</Link></li>
              <li><Link href={"/files/about/svid_2016.pdf"} target="_blank" rel="noopener noreferrer">Свидетельство о гос. регистрации</Link></li>
              <li><Link href={"/files/about/san_epid.png"} target="_blank" rel="noopener noreferrer">Санитарно-эпидемиологическое заключение</Link></li>
              <li><Link href={"/files/about/pozh_bez.png"} target="_blank" rel="noopener noreferrer">Заключение о соответствии требованиям пожарной безопасности</Link></li>
              <li><Link href={"/files/about/reshenie.pdf"} target="_blank" rel="noopener noreferrer">Решение Учредителя</Link></li>
            </ul>
        </div>
        <div className="border-2 border-dotted border-zinc-300 pb-4 mt-8 rounded shadow-2xl bg-white px-6 py-3">      

          <h2 className="text-blue font-semibold text-2xl mt-8">Уставные документы и лицензия на право ведения образовательной деятельности:</h2>
          <hr className="border-zinc-300 w-full h-2" />
          <div>
            <button onClick={handleOpen}>Open</button>
            {active && <p>asdasdasd</p>}
          </div>
        </div>
      </div>
    </div>
  
    <p className="text-default text-sm p-1 mt-8">Раздел подготовлен в соответствии с Правилами размещения информации на официальном сайте образовательной организации (Постановление Правительства Российской Федерации от 20 октября 2021 г. № 1802, Приказ Рособрнадзора от 14.08.2020 N 831, письмо Федеральной службы по надзору в сфере образования и науки №07-675 от 25 марта 2015 г.)</p>
  </section>
  )
}
