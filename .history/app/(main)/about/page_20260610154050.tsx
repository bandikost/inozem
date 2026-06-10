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

import {
  FileText,
  Info,
  GraduationCap,
  MapPinned,
  Building2,
  ChevronRight,
} from "lucide-react";

import { ToggleBlock } from "@/components/ui/Buttons/ToggleBlock";

export const metadata = {
  title:
    "О нас | ЧОУ ДПО «Академия медицинского образования им. Ф.И.Иноземцева»",
};

export default function Page() {
  return (
    <section className="min-h-screen">
      <div className="container mx-auto px-4 py-24">

        <div className="text-center max-w-4xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-prpl/10 px-5 py-2 text-prpl font-medium">
            <GraduationCap size={18} />
            Академия медицинского образования
          </div>

          <h1 className="mt-6 text-5xl font-bold text-slate-900">
            О нашей Академии
          </h1>

          <p className="mt-5 text-lg text-slate-600">
            Более 15 лет мы занимаемся дополнительным профессиональным
            образованием медицинских специалистов по всей России.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Building2 className="text-prpl" />
              <h2 className="text-2xl font-bold text-slate-900">
                Наши преимущества
              </h2>
            </div>

            <div className="grid gap-4">
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100"
                >
                  <div className="w-10 h-10 rounded-full bg-prpl text-white flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>

                  <p className="text-slate-700 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MapPinned className="text-prpl" />
              <h2 className="text-2xl font-bold text-slate-900">
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
          <p className="text-slate-700 leading-relaxed">
            Раздел подготовлен в соответствии с Правилами размещения информации
            на официальном сайте образовательной организации.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-10">

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <Info className="text-prpl" />
              <h2 className="text-2xl font-bold">
                Юридическая информация
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
              <FileText className="text-blue-600" />
              <h2 className="text-2xl font-bold">
                Документы Академии
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
                  "
                >
                  <span>{doc.name}</span>

                  <ChevronRight size={18} />
                </Link>
              ))}
            </div>

            <div className="mt-8 space-y-4">

              <ToggleBlock title="Бюджетные сметы">
                {smeta.map((doc, i) => (
                  <Link
                    key={i}
                    href={doc.link}
                    target="_blank"
                    className="block py-2 hover:text-prpl"
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
                    className="block py-2 hover:text-prpl"
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
                    className="block py-2 hover:text-prpl"
                  >
                    {doc.name}
                  </Link>
                ))}
              </ToggleBlock>

              <ToggleBlock title="Предписания">
                {prescript.map((doc, i) => (
                  <Link
                    key={i}
                    href={doc.link}
                    className="block py-2 hover:text-prpl"
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
              <div className="grid gap-3">
                <div>Федеральный закон №273-ФЗ «Об образовании»</div>
                <div>Федеральный закон №323-ФЗ</div>
                <div>Приказы Минздрава РФ</div>
                <div>Постановления Правительства РФ</div>
                <div>Локальные нормативные акты Академии</div>
              </div>
            </ToggleBlock>
          </div>

        </div>

      </div>
    </section>
  );
}