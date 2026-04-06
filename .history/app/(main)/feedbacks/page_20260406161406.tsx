export default async function Page() {
  return (
    <section className="flex flex-col justify-center pb-20 px-4">
      <h1 className="mt-27 text-prpl text-center">Отзывы об академии</h1>
      <div style={{ width: '560px', height: '800px', overflow: 'hidden', position: 'relative' }}>
        <iframe
          style={{
            width: '100%',
            height: '100%',
            border: '1px solid #e6e6e6',
            borderRadius: '8px',
            boxSizing: 'border-box',
          }}
          src="https://yandex.ru/maps-reviews-widget/1135084160?comments"
        ></iframe>
        <a
          href="https://yandex.ru/maps/org/akademiya_meditsinskogo_obrazovaniya_im_f_i_inozemtseva/1135084160/"
          target="_blank"
          style={{
            boxSizing: 'border-box',
            textDecoration: 'none',
            color: '#a7a4a4',
            fontSize: '10px',
            fontFamily: 'YS Text, sans-serif',
            padding: '0 16px',
            position: 'absolute',
            bottom: '8px',
            width: '100%',
            textAlign: 'center',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: 'block',
            maxHeight: '14px',
            whiteSpace: 'nowrap',
          }}
        >
          Академия медицинского образования им. Ф. И. Иноземцева на карте Санкт‑Петербурга — Яндекс Карты
        </a>
      </div>
    </section>
  );
}