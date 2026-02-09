"use client"

import { File, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const features = [
  "Академия расположена в историческом центре Санкт-Петербурга",
  "Гибкая ценовая политика и грамотный менеджмент позволяют нам всегда находить компромиссы и идти вперед вместе с Вами",
  "Уникальное предложение для работодателей по организации и проведению входного обучения новых сотрудников",
  "Возможность дистанционного обучения сотрудников",
  "Современное симуляционное оборудование",
  "Просторный лекционный зал",
  "Мы оказываем услуги по повышению уровня квалификации врачебного и среднего медицинского персонала",
  "Все услуги лицензированы в соответствии с Российским законодательством",
  "Перечень услуг включает проведение стажировок, циклов повышения квалификации, тренингов, семинаров, мастер-классов, конференций и прочее",
];

const legalInfo = [
  { title: "Полное наименование образовательной организации", text: "Частное образовательное учреждение дополнительного профессионального образования «Академия медицинского образования имени Федора Ивановича Иноземцева»"},
  { title: "Сокращенное наименование", text: "ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»"},
  { title: "Полное наименование образовательной организации на английском языке", text: "Private Educational Institution of Supplementary Education «Academy of Medical Education named after F.I.Inozemtsev»" },
  { title: "Дата создания образовательной организации", text: "27 января 2009 года"},
  { title: "Лицензия, аккредитация", text: "Лицензия на право ведения образовательной деятельности - регистрационный № 2337, выдана Комитетом по образованию Правительства Санкт-Петербурга 16 ноября 2016 года, серия 78Л01 №0000752"},
  { title: "Учредитель образовательной организации", text: "Акционерное общество «Современные медицинские технологии», являющееся юридическим лицом по законодательству РФ, место нахождения: 190013, Санкт-Петербург, Московский пр., 22, зарегистрированное Межрайонной инспекцией Федеральной налоговой службы №15 по Санкт-Петербургу 05.06.2008г. за основным государственным регистрационным номером 1089847230417, о чем выдано свидетельство Серия 78 №006981724"},
  { title: "Директор Академии", text: "Кощеева Наталья Александровна"},
]

const documents = [
  { name: "Устав Академии от 2018 года", link: "/files/about/ustav_2017.pdf" },
  { name: "Лицензия на осуществление образовательной деятельности", link: "/files/about/litsenz.pdf" },
  { name: "Выписка из реестра лицензий", link: "/files/about/reester.pdf" },
  { name: "Свидетельство о гос. регистрации", link: "/files/about/svid_2016.pdf" },
  { name: "Санитарно-эпидемиологическое заключение", link: "/files/about/san_epid.png" },
  { name: "Заключение о соответствии требованиям пожарной безопасности", link: "/files/about/pozh_bez.png" },
  { name: "Решение Учредителя", link: "/files/about/reshenie.pdf" }
];

const smeta = [
  { name: "Поступление и расходование финансовых и материальных средств 2014 год", link: "/files/about/smeta/smeta2014.pdf" },
  { name: "Поступление и расходование финансовых и материальных средств 2015 год", link: "/files/about/smeta/smeta2015.pdf" },
  { name: "Поступление и расходование финансовых и материальных средств 2016 год", link: "/files/about/smeta/smeta2016.pdf" },
  { name: "Поступление и расходование финансовых и материальных средств 2017 год", link: "/files/about/smeta/smeta2017.pdf" },
  { name: "Поступление и расходование финансовых и материальных средств 2018 год", link: "/files/about/smeta/smeta2018.pdf" },
  { name: "Поступление и расходование финансовых и материальных средств 2020 год", link: "/files/about/smeta/smeta2020.pdf" },
];

const regulations = [
  { name: "Положение об Общем собрании работников ЧОУ ДПО «Академия медицинского образования им. Ф.И. Иноземцева»", link: "/files/about/regulations/obshchee_sobranie_rabotnikov.pdf"},
  { name: "Положение о Педагогическом совете", link: "/files/about/regulations/pedagogicheskiy_sovet.pdf" },
  { name: "Положение об информационной открытости", link: "/files/about/regulations/informatsionnaya_otkrytost.pdf" },
  { name: "Положение по организации и осуществлению образовательной деятельности", link: "/files/about/regulations/organizatsiya_obrazovatelnoy_deyatelnosti.pdf" },
  { name: "Положение об обработке и защите персональных данных", link: "/files/about/regulations/personalnye_dannye.pdf" },
  { name: "Политика конфиденциальности", link: "/files/about/regulations/politika_konfidentsialnosti.pdf" },
  { name: "Правила приема, отчисления и восстановления обучающихся", link: "/files/about/regulations/priemy_otchislenie_vosstanovlenie.pdf" },
  { name: "Положение о порядке проведения сертификационного экзамена при реализации дополнительных профессиональных программ", link: "/files/about/regulations/sertifikatsionnyy_ekzamen.pdf" },
  { name: "Положение о формах, периодичности и порядке текущего контроля успеваемости", link: "/files/about/regulations/tekushchiy_kontrol_uspevaemosti.pdf" },
  { name: "Правила внутреннего распорядка обучающихся", link: "/files/about/regulations/vnutrenniy_rasporyadok_obuchayushchikhsya.pdf" },
  { name: "Режим занятий обучающихся", link: "/files/about/regulations/rezhim_zanyatiy.pdf" },
  { name: "Правила внутреннего трудового распорядка", link: "/files/about/regulations/trudovoy_rasporyadok.pdf" },
  { name: "Положение об электронной информационно-образовательной среде", link: "/files/about/regulations/eios.pdf" },
  { name: "Сведения о научно-педагогическом совете", link: "/files/about/regulations/nauchno_pedagogicheskiy_sovet.pdf" },
]

const order = [
  {name: "", link: ""},
]

const prescript = [
  {name: "", link: ""},
]


function ToggleBlock({ title, children }: { title: string, children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-2 px-4 grid gap-2">
      <button
        onClick={() => setOpen(prev => !prev)}
        className="mt-4 text-prpl text-2xl cursor-pointer hover:underline "
      >
        {title} ({open ? "Свернуть" : "Развернуть"})
      </button>
      {open && <div className="px-6 mt-2 text-default grid gap-2">{children}</div>}
    </div>
  )
}

export default function Page() {
  return (
    <section className="flex flex-col">
      <h1 className="text-prpl font-semibold mt-10 text-3xl text-center">О нас</h1>

      <div className="border-2 border-dotted border-zinc-300 pb-4 mt-8 rounded shadow-2xl bg-white px-6 py-3">
        <h2 className="text-prpl font-semibold text-2xl mt-2">Наши особенности</h2>
        <ul className="grid gap-1 mt-4 text-md">
          {features.map((f, i) => <li key={i}>{i + 1}. {f}</li>)}
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col mt-8">
          <h1 className="text-prpl font-semibold text-3xl mt-2 flex items-center px-6">
            <Info className="mr-2" />Юридическая информация
          </h1>
          <div className="border-2 border-dotted border-zinc-300 pb-4 mt-8 rounded shadow-2xl bg-white px-6 py-3">
            {legalInfo.map((item, i) => (
              <div key={i} className="mt-4">
                <h2 className="text-prpl font-semibold text-2xl">{item.title}</h2>
                <hr className="border-zinc-300 w-full h-2" />
                <p className="text-default text-md mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col mt-8">
          <h1 className="text-blue font-semibold text-3xl mt-2 flex items-center px-6">
            <File className="mr-2"/>Документы Академии
          </h1>

          <div className="border-2 border-dotted border-zinc-300 pb-4 mt-8 rounded shadow-2xl bg-white px-6 py-3">
            <h2 className="text-blue font-semibold text-2xl mt-4">
              Уставные документы и лицензия на право ведения образовательной деятельности:
            </h2>
            <hr className="border-zinc-300 w-full h-2" />
            <ul className="grid gap-4  mt-4 text-blue">
              {documents
              .slice(0, 7)
              .map((doc, i) => (
                <li key={i}>
                  <Link href={doc.link} className="hover:underline" target="_blank" rel="noopener noreferrer">{doc.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-dotted border-zinc-300 pb-4 mt-8 rounded shadow-2xl bg-white px-6 py-3 grid gap-4">
            <ToggleBlock title="Бюджетные сметы образовательной организации:">
              {smeta.map((doc, i) => (
                <li key={i} className="list-none text-blue ">
                  <Link href={doc.link} className="hover:underline" target="_blank" rel="noopener noreferrer">{doc.name}</Link>
                </li>
              ))}
            </ToggleBlock>
             <ToggleBlock title="Локальные нормативные акты">
              {regulations.map((doc, i) => (
                <li key={i} className="list-none text-blue ">
                  <Link href={doc.link} className="hover:underline" target="_blank" rel="noopener noreferrer">{doc.name}</Link>
                </li>
              ))}
             </ToggleBlock>
             <ToggleBlock title="Документы о порядке оказания платных образовательных услуг:">
              {order.map((doc, i) => (
                <li key={i} className="list-none text-blue ">
                  <Link href={doc.link} className="hover:underline" target="_blank" rel="noopener noreferrer">{doc.name}</Link>
                </li>
              ))}
             </ToggleBlock>
             <ToggleBlock title="Предписания: ">
              {prescript.map((doc, i) => (
                <li key={i} className="list-none text-blue ">
                  <Link href={doc.link} className="hover:underline" target="_blank" rel="noopener noreferrer">{doc.name}</Link>
                </li>
              ))}
             </ToggleBlock>
          </div>
        </div>
      </div>

      <p className="text-default text-sm p-1 mt-8">
       Раздел подготовлен в соответствии с Правилами размещения информации на официальном сайте образовательной организации (Постановление Правительства Российской Федерации от 20 октября 2021 г. № 1802, Приказ Рособрнадзора от 14.08.2020 N 831, письмо Федеральной службы по надзору в сфере образования и науки №07-675 от 25 марта 2015 г.)
      </p>
    </section>
  )
}
