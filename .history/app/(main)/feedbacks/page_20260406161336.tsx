'use client';

import { useState } from 'react';

const reviews = [
  'https://yandex.ru/maps-reviews-widget/1135084160?comments',
  'https://yandex.ru/maps-reviews-widget/1135084161?comments',
  'https://yandex.ru/maps-reviews-widget/1135084162?comments',
];

export default function Page() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prev = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="flex flex-col justify-center pb-20 px-4 items-center">
      <h1 className="mt-8 text-prpl text-center text-2xl font-bold">Отзывы об академии</h1>

      <div className="relative w-[560px] h-[800px] mt-6 overflow-hidden rounded-lg border border-gray-200">
        {/* Карусель iframe */}
        <iframe
          key={reviews[current]}
          src={reviews[current]}
          className="w-full h-full rounded-lg border-none"
        ></iframe>

        {/* Ссылка под iframe */}
        <a
          href="https://yandex.ru/maps/org/akademiya_meditsinskogo_obrazovaniya_im_f_i_inozemtseva/1135084160/"
          target="_blank"
          className="absolute bottom-2 left-0 w-full text-center text-xs text-gray-400 truncate px-4"
        >
          Академия медицинского образования им. Ф. И. Иноземцева на карте Санкт‑Петербурга — Яндекс Карты
        </a>

        {/* Стрелки */}
        <button
          onClick={prev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          ◀
        </button>
        <button
          onClick={next}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100"
        >
          ▶
        </button>
      </div>
    </section>
  );
}