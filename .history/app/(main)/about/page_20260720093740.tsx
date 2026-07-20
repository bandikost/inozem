import {
  features,
  legalInfo,
  documents,
  regulations,
  smeta,
  order,
  prescript,
} from "@/data/partners";

import Link from "next/link";
import { FileText, Info, MapPinned, Building2, ChevronRight } from "lucide-react";
import { ToggleBlock } from "@/components/ui/Buttons/ToggleBlock";
import LoadingLink from "@/components/Load/LoadingLink";

export const metadata = {
  title:
    "О нас | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
};

export default function Page() {
  return (
    <section className="min-h-screen">
     
      <div className="container mx-auto px-4 py-27">
       <nav className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-2 text-md text-zinc-500 px-6">
             
                   <LoadingLink href="/" className="shrink-0 hover:text-blue transition hover:underline">
                     Главная
                   </LoadingLink>
             
                   <ChevronRight size={14} className="shrink-0" />
             
               <span className="min-w-0 flex-1 truncate text-zinc-800 opacity-70">
                 О нас
               </span>
             
             </nav>
        <div className="text-center max-w-4xl mx-auto mb-14">
 
          <h1 className="mt-6 text-5xl font-semibold text-prpl">
            О нашей Академии
          </h1>

          <p className="mt-5 font-medium text-lg text-slate-600">
            Более 15 лет мы занимаемся дополнительным профессиональным
            образованием медицинских специалистов по всей России.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="text-prpl" />
              <h2 className="text-2xl font-bold text-prpl">
                Наши преимущества
              </h2>
            </div>

           <div className="grid gap-4">
  {features.map((item, index) => (
    <div
      key={index}
      className="
        flex
        items-center
        gap-4
        p-4
        rounded-2xl
        bg-slate-50
        border border-slate-200
        shadow
        !text-lg
      "
    >
      <div
        className="
          flex-shrink-0
          w-10 h-10
          rounded-full
          bg-prpl
          text-white
          flex items-center justify-center
          font-semibold
        "
      >
        {index + 1}
      </div>

      <p className="text-slate-600 leading-relaxed !text-lg">
        {item}
      </p>
    </div>
  ))}
</div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MapPinned className="text-prpl" />
              <h2 className="text-2xl font-bold text-prpl">
                Наши слушатели по всей России
              </h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <iframe
                src="https://yandex.ru/map-widget/v1/?um=constructor%3A4IbnQNqOhTRc_MYs6AhwA-u0opOGhWWI&lang=ru_RU"
                width="100%"
                height="450"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-6">
          <p className="text-slate-600 leading-relaxed text-lg">
            Раздел подготовлен в соответствии с Правилами размещения информации
            на официальном сайте образовательной организации.
          </p>
        </div>

        <h3 className="my-6 !text-3xl font-semibold text-prpl text-center">Сведения об образовательной организации</h3>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Info className="text-prpl" />
              <h2 className="text-2xl font-bold text-prpl">
                Основные сведения
              </h2>
            </div>

            <div className="grid gap-4">
              {legalInfo.map((item, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 p-5"
                >
                  <h3 className="font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-slate-600">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <FileText className="text-blue" />
              <h2 className="text-2xl font-bold text-blue">
                Документы
              </h2>
            </div>

              
            <div className="grid gap-3">
              {documents.map((doc, index) => (
                <Link
                  key={index}
                  href={doc.link}
                  target="_blank"
                  className="
                  flex
                  justify-between
                  items-center
                  p-4
                  rounded-2xl
                  border
                  border-slate-200
                  hover:border-prpl
                  hover:bg-prpl/5
                  transition-all
                  cursor-poiner
                  text-lg
                  "
                >
                  <span>{doc.name}</span>

                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>

            <div className="mt-8 space-y-4">

              <ToggleBlock title="Финансово-хозяйственная деятельность">
                {smeta.map((doc, i) => (
                  <Link
                    key={i}
                    href={doc.link}
                    target="_blank"
                    className="block py-2 hover:text-prpl hover:underline cursor-pointer"
                  >
                    {doc.name}
                  </Link>
                ))}
              </ToggleBlock>
           

              <ToggleBlock title="Локальные нормативные акты">
                {regulations.map((doc, i) => (
                  <Link
                    key={i}
                    href={doc.link}
                    target="_blank"
                    className="block py-2 hover:text-prpl hover:underline cursor-pointer"
                  >
                    {doc.name}
                  </Link>
                ))}
              </ToggleBlock>

              <ToggleBlock title="Платные образовательные услуги">
                {order.map((doc, i) => (
                  <Link
                    key={i}
                    href={doc.link}
                    className="block py-2 hover:text-prpl hover:underline cursor-pointer"
                  >
                    {doc.name}
                  </Link>
                ))}
              </ToggleBlock>

              <ToggleBlock title="Стипендии и меры поддержки обучающихся">
                <p>Не предусмотрено</p>
              </ToggleBlock>

              <ToggleBlock title="Международное сотрудничество">
                <p>Не предусмотрено</p>
              </ToggleBlock>

              <ToggleBlock title="Стипендии и меры поддержки обучающихся">
                <p>Не предусмотрено</p>
              </ToggleBlock>

              <ToggleBlock title="Предписания">
                {prescript.map((doc, i) => (
                  <Link
                    key={i}
                    href={doc.link}
                    className="block py-2 hover:text-prpl hover:underline cursor-pointer"
                  >
                    {doc.name}
                  </Link>
                ))}
              </ToggleBlock>

            </div>
          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            <img
              src="/Images/about/inozemtsev.png"
              alt="Иноземцев"
              className="
              w-56
              h-56
              object-cover
              rounded-3xl
              shadow-md
              "
            />

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                Фёдор Иванович Иноземцев
              </h2>

              <p className="mt-5 leading-8 text-slate-600">
                Академия носит имя выдающегося русского врача, учёного,
                педагога и общественного деятеля Фёдора Ивановича
                Иноземцева. Его вклад в развитие отечественной медицины
                и медицинского образования стал основой философии нашей
                Академии.
              </p>
            </div>

          </div>
        </div>

        <div className="mt-10 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">

          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Образовательные стандарты
          </h2>

          <p className="text-slate-600 leading-8">
            Академия осуществляет образовательную деятельность в
            соответствии с законодательством Российской Федерации,
            нормативными актами Министерства образования и
            Министерства здравоохранения Российской Федерации.
          </p>

          <div className="mt-8">
  <ToggleBlock title="Показать нормативные документы">
    <div className="space-y-8 text-slate-700 leading-7">

      <p>
        ЧОУ ДПО «Академия медицинского образования им. Ф.И. Иноземцева»
        осуществляет свою деятельность в соответствии с Конституцией Российской
        Федерации, Гражданским кодексом Российской Федерации, Федеральным законом
        от 29 декабря 2012 г. № 273-ФЗ «Об образовании в Российской Федерации»,
        Федеральным законом «О некоммерческих организациях», иными нормативными
        правовыми актами Российской Федерации и Уставом Академии.
      </p>

      <p>
        ЧОУ ДПО «Академия медицинского образования им. Ф.И. Иноземцева»
        самостоятельно осуществляет образовательный процесс, разрабатывает,
        принимает и реализует дополнительные профессиональные образовательные
        программы с учетом требований действующего законодательства Российской
        Федерации.
      </p>

      <div>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">
          Основные нормативные документы
        </h3>

        <ul className="space-y-3 list-disc pl-6">
          <li>
            Указ Президента Российской Федерации № 598 от 07.05.2012
            «О совершенствовании государственной политики в сфере здравоохранения».
          </li>

          <li>
            Указ Президента Российской Федерации № 400 от 02.07.2021
            «О Стратегии национальной безопасности Российской Федерации».
          </li>

          <li>
            Федеральный закон от 29.12.2012 № 273-ФЗ
            «Об образовании в Российской Федерации».
          </li>

          <li>
            Федеральный закон от 28.02.2025 № 28-ФЗ
            «О внесении изменений в отдельные законодательные акты Российской Федерации».
          </li>

          <li>
            Федеральный закон от 21.11.2011 № 323-ФЗ
            «Об основах охраны здоровья граждан в Российской Федерации».
          </li>

          <li>
            Федеральный закон от 17.02.2023 № 16-ФЗ
            «Об особенностях правового регулирования отношений в сферах охраны
            здоровья, обязательного медицинского страхования, обращения лекарственных
            средств и обращения медицинских изделий в связи с принятием в Российскую
            Федерацию Донецкой Народной Республики, Луганской Народной Республики,
            Запорожской области и Херсонской области».
          </li>

          <li>
            Федеральный закон от 30.12.2015 № 432-ФЗ
            «О внесении изменений в статью 25 Закона Российской Федерации
            «Об организации страхового дела в Российской Федерации» и Федеральный
            закон «Об обязательном медицинском страховании в Российской Федерации».
          </li>

          <li>
            Постановление Правительства Российской Федерации от 26.02.2021 № 273
            «Об утверждении Правил использования медицинскими организациями средств
            нормированного страхового запаса территориального фонда обязательного
            медицинского страхования для финансового обеспечения мероприятий по
            организации дополнительного профессионального образования медицинских
            работников по программам повышения квалификации, а также по приобретению
            и проведению ремонта медицинского оборудования».
          </li>

          <li>
            Приказ Министерства образования и науки Российской Федерации от
            15.11.2013 № 1244 «О внесении изменений в Порядок организации и
            осуществления образовательной деятельности по дополнительным
            профессиональным программам».
          </li>

          <li>
            Приказ Министерства образования и науки Российской Федерации от
            25.10.2013 № 1185 «Об утверждении примерной формы договора об образовании
            на обучение по дополнительным образовательным программам».
          </li>

          <li>
            Приказ Министерства здравоохранения и социального развития Российской
            Федерации от 23.07.2010 № 541н «Об утверждении Единого
            квалификационного справочника должностей руководителей, специалистов
            и служащих».
          </li>

          <li>
            Приказ Министерства здравоохранения и социального развития Российской
            Федерации от 03.08.2012 № 66н «Об утверждении Порядка и сроков
            совершенствования медицинскими работниками и фармацевтическими
            работниками профессиональных знаний и навыков путем обучения по
            дополнительным профессиональным образовательным программам».
          </li>

          <li>
            Приказ Министерства здравоохранения Российской Федерации от 02.05.2023
            № 206н «Об утверждении Квалификационных требований к медицинским и
            фармацевтическим работникам с высшим образованием».
          </li>

          <li>
            Приказ Министерства здравоохранения Российской Федерации от 19.02.2024
            № 72н «О внесении изменений в Квалификационные требования к медицинским
            и фармацевтическим работникам с высшим образованием».
          </li>

          <li>
            Приказ Министерства здравоохранения Российской Федерации от 10.02.2016
            № 83н «Об утверждении Квалификационных требований к медицинским и
            фармацевтическим работникам со средним медицинским и фармацевтическим
            образованием».
          </li>

          <li>
            Приказ Министерства здравоохранения Российской Федерации от 02.05.2023
            № 205н «Об утверждении Номенклатуры должностей медицинских работников
            и фармацевтических работников».
          </li>

          <li>
            Приказ Министерства здравоохранения Российской Федерации от 04.12.2023
            № 649н «О внесении изменений в Номенклатуру должностей медицинских
            работников и фармацевтических работников».
          </li>

          <li>
            Приказ Министерства здравоохранения Российской Федерации от 28.10.2022
            № 709н «Об утверждении Положения об аккредитации специалистов».
          </li>

          <li>
            Приказ Минздрава России от 22.11.2021 № 1082н
            «Об утверждении порядка выдачи свидетельства об аккредитации специалиста
            на бумажном носителе».
          </li>

          <li>
            Приказ Минздрава России от 15.03.2021 № 205н
            «Об утверждении Порядка выбора медицинским работником программы
            повышения квалификации».
          </li>

          <li>
            Приказ Министерства здравоохранения Российской Федерации от 07.10.2015
            № 700н «О номенклатуре специальностей специалистов, имеющих высшее
            медицинское и фармацевтическое образование».
          </li>

          <li>
            Приказ Министерства здравоохранения и социального развития Российской
            Федерации от 16.04.2008 № 176н «О номенклатуре специальностей
            специалистов со средним медицинским и фармацевтическим образованием».
          </li>

          <li>
            Приказ Минздрава России от 01.11.2022 № 715н
            «Об утверждении Порядка допуска лиц к осуществлению медицинской или
            фармацевтической деятельности на должностях специалистов со средним
            медицинским или средним фармацевтическим образованием».
          </li>

          <li>
            Приказ Росздравнадзора от 31.10.2022 № 10335
            «Об утверждении порядка установления соответствия полученных в
            иностранных организациях образования и квалификации квалификационным
            требованиям к медицинским и фармацевтическим работникам».
          </li>

          <li>
            Устав Академии и иные локальные нормативные акты ЧОУ ДПО
            «Академия медицинского образования им. Ф.И. Иноземцева».
          </li>
        </ul>
      </div>

      <p>
        В соответствии с требованиями Федерального закона от 29.12.2012 № 273-ФЗ
        «Об образовании в Российской Федерации» и приказа Минобрнауки России № 499
        «Об утверждении Порядка организации и осуществления образовательной
        деятельности по дополнительным профессиональным программам» ЧОУ ДПО
        «Академия медицинского образования им. Ф.И. Иноземцева» выбирает наиболее
        эффективные формы, методы и технологии обучения, а также создает необходимые
        условия для освоения слушателями образовательных программ.
      </p>

    </div>
  </ToggleBlock>
</div>

        </div>

      </div>
    </section>
  );
}