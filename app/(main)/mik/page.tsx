'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ConferencePage() {
  return (
    <>
      <section className="hero">
        <video
          className="hero__video"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/content/video/main.mp4" type="video/mp4" />
        </video>

        <div className="hero__content">
          <div className="container">
            <div className="hero__date">13 - 14 октября 2026</div>

            <h1 className="hero__title">
              IX межрегиональная научно-практическая конференция <br />
              <strong>
                Медицина и качество. Обеспечение качества и безопасности
                медицинской деятельности.
              </strong>
              <br />
              <span>г. Санкт-Петербург, КВЦ «Экспофорум»</span>
            </h1>
          </div>
        </div>
      </section>

      <section className="info">
        <div className="container info__grid">
          <div className="info_container">
            <div className="info__block">
              <div className="info__num">01</div>

              <h2 className="info__title">О КОНФЕРЕНЦИИ</h2>

              <p className="info__text">
                «Медицина и качество» — ежегодная межрегиональная конференция
                с международным участием, проводимая в Санкт-Петербурге с 2017
                года при поддержке Росздравнадзора. Это крупнейшая площадка в
                СЗФО для обсуждения вопросов качества и безопасности
                медицинской деятельности, обмена опытом и внедрения современных
                решений. Конференция входит в конгрессную программу
                Петербургского международного форума здоровья, подтверждая
                свою высокую значимость для профессионального сообщества.
              </p>
            </div>
          </div>

          <div className="info_container">
            <div className="info__block">
              <div className="info__num">02</div>

              <h2 className="info__title">ОБ ОРГАНИЗАТОРЕ</h2>

              <p className="info__text">
                ЧОУ ДПО «Академия медицинского образования им. Ф. И.
                Иноземцева» более 17 лет развивает систему непрерывного
                медицинского образования, обеспечивая повышение квалификации и
                профессиональную переподготовку специалистов здравоохранения.
                Деятельность Академии направлена на внедрение современных
                образовательных решений, развитие профессиональных компетенций
                и повышение качества медицинской помощи.
              </p>
            </div>
          </div>

          <div className="info__block">
            <div className="info__num">03</div>

            <h2 className="info__title">КЛЮЧЕВЫЕ ТЕМЫ 2026</h2>

            <ul className="topics">
              <li>Экосистема здравоохранения</li>
              <li>Управление ресурсами клиники</li>
              <li>Пациентоцентричность</li>
              <li>Лекарственная безопасность и фармаконадзор</li>
              <li>
                Контроль качества и безопасности медицинских изделий
              </li>
              <li>
                Искусственный интеллект – технологии и безопасность в медицине
              </li>
              <li>Культура управления и стратегия развития</li>
              <li>
                Внутренний контроль качества и безопасности медицинской
                деятельности
              </li>
              <li>
                Современные подходы и требования к обеспечению врачебной
                безопасности
              </li>
              <li>
                Профилактическая медицина. Современные тенденции
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container stats__grid">
          <div className="stats__item">
            <div className="stats__num">8 000+</div>
            <div className="stats__label">участников за 8 лет</div>
          </div>

          <div className="stats__item">
            <div className="stats__num">72</div>
            <div className="stats__label">региона России</div>
          </div>

          <div className="stats__item">
            <div className="stats__num">12</div>
            <div className="stats__label">стран-участниц</div>
          </div>

          <div className="stats__item">
            <div className="stats__num">175+</div>
            <div className="stats__label">докладчиков</div>
          </div>
        </div>
      </section>

      <section className="banner-section">
        <Image
          className="banner-bg"
          src="/content/images/banner.png"
          alt=""
          width={1920}
          height={500}
          priority
        />
      </section>

      <section className="partners">
        <div className="partners__double">
          <div className="partners__double-col">
            <h2 className="partners__title">
              Организаторы конференции
            </h2>

            <div className="partners__logos">
              <div className="partners__item">
                <Image
                  src="/content/images/partners/1.1.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>

              <div className="partners__item">
                <Image
                  src="/content/images/partners/1.2.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>

              <div className="partners__item">
                <Image
                  src="/content/images/partners/1.3.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>
            </div>
          </div>

          <div className="partners__divider" />

          <div className="partners__double-col">
            <h2 className="partners__title">При поддержке</h2>

            <div className="partners__logos">
              <div className="partners__item">
                <Image
                  src="/content/images/partners/2.1.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>

              <div className="partners__item">
                <Image
                  src="/content/images/partners/2.2.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>

              <div className="partners__item">
                <Image
                  src="/content/images/partners/2.3.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>

        <h3
          className="partners__subtitle"
          style={{ marginTop: '80px' }}
        >
          ГАЛЕРЕЯ
        </h3>

        <div className="slider">
          <Swiper
            className="mySwiper"
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
          >
            <SwiperSlide>
              <Image
                src="/content/images/slider/2.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                src="/content/images/slider/1.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                src="/content/images/slider/3.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                src="/content/images/slider/4.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                src="/content/images/slider/5.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <h3
          className="partners__subtitle"
          style={{
            backgroundColor: '#ad217b',
            padding: '20px 0px',
            fontSize: '36px',
          }}
        >
          СТОИМОСТЬ УЧАСТИЯ БЕСПЛАТНО
        </h3>
      </section>

      <section className="audience">
        <div className="container">
          <h2 className="audience__title">КТО УЧАСТВУЕТ</h2>

          <div className="audience__grid">
            <div className="audience__item">
              <div className="audience__icon">01</div>
              <p>
                Руководители и заместители руководителей медицинских
                организаций
              </p>
            </div>

            <div className="audience__item">
              <div className="audience__icon">02</div>
              <p>
                Представители органов исполнительной власти в сфере
                здравоохранения
              </p>
            </div>

            <div className="audience__item">
              <div className="audience__icon">03</div>
              <p>
                Специалисты по контролю качества и безопасности
                медицинской деятельности
              </p>
            </div>

            <div className="audience__item">
              <div className="audience__icon">04</div>
              <p>
                Главные медицинские сёстры, специалисты с высшим
                медицинским образованием
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="results">
        <div className="container">
          <div className="results__inner">
            <div className="results__left">
              <h2 className="results__title">
                ОБРАЗОВАТЕЛЬНЫЕ
                <br />
                РЕЗУЛЬТАТЫ
              </h2>

              <p className="results__sub">
                По итогам конференции участники получат практический
                опыт, который можно применить сразу.
              </p>
            </div>

            <ul className="results__list">
              <li>
                Опыт внедрения системы менеджмента качества в медицинских
                организациях
              </li>

              <li>
                Навыки диагностики скрытых потерь и применения
                инструментов бережливого производства
              </li>

              <li>
                Методику проведения внутреннего аудита и оценки кадрового
                потенциала
              </li>

              <li>
                Знания по информационной, лекарственной, хирургической и
                эпидемиологической безопасности
              </li>

              <li>
                Навыки проектного управления и командного взаимодействия
              </li>

              <li>
                Компетенции в области телемедицины и использования МИС
                для управления качеством
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="formats">
        <div className="container">
          <h2 className="formats__title">ФОРМАТЫ УЧАСТИЯ</h2>

          <div className="formats__grid">
            <div className="formats__card">
              <div className="formats__tag">Очно</div>

              <h3>Аудиторное участие</h3>

              <p>
                Санкт-Петербург, КВЦ «Экспофорум», Петербургское шоссе,
                64/1. Регистрация на стойке с индивидуальным бейджем и
                контролем присутствия.
              </p>
            </div>

            <div className="formats__card formats__card--accent">
              <div className="formats__tag">Онлайн</div>

              <h3>Дистанционное участие</h3>

              <p>
                Трансляция на платформе Pruffme. Ссылка отправляется за
                сутки и за час до начала. Учёт присутствия по времени
                подключения.
              </p>
            </div>

            <div className="formats__card">
              <div className="formats__tag">Доклад</div>

              <h3>Выступить докладчиком</h3>

              <p>
                Поделитесь опытом вашей организации с профессиональным
                сообществом. Подайте заявку на участие в качестве спикера.
              </p>
            </div>
          </div>

          <p className="formats__note">
            Мероприятие подано в Комиссию по оценке учебных мероприятий
            Координационного совета по развитию НМО Минздрава России.
          </p>
        </div>
      </section>

      <section className="section section_contact">
        <div className="contact_container">
          <h2 className="section-title reveal">
            СТАТЬ УЧАСТНИКОМ МИК СЗФО
          </h2>

          <form className="form reveal">
            <input
              type="email"
              placeholder="Email"
              required
            />

            <button className="btn" type="submit">
              подать заявку
            </button>
          </form>
        </div>
      </section>

      <section id="location" className="section section_map">
        <div className="map__inner">
          <div className="map__text">
            <p className="map__label">МЕСТО ПРОВЕДЕНИЯ</p>

            <h2 className="map__title">
              Петербургский международный форум здоровья
            </h2>

            <p className="map__dates">
              13–15 октября 2026 &nbsp;·&nbsp; Экспофорум
            </p>

            <p className="map__desc">
              Конференция «Медицина и качество» проходит в рамках ПМФЗ —
              одного из ключевых конгрессно-выставочных событий в сфере
              здравоохранения, проводимого с 2013 года.
            </p>

            <p className="map__desc">
              Лидеры отрасли, профессиональное сообщество и инновационные
              решения на одной площадке. Форум охватывает основные разделы
              отрасли: насыщенная конгрессно-деловая программа и
              специализированная выставочная экспозиция.
            </p>

            <div className="map__address">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="currentColor"
                />
              </svg>

              <span>
                г. Санкт-Петербург, Петербургское шоссе, 64/1
              </span>
            </div>
          </div>

          <div className="map__frame">
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae712921275ab10fdd9d63b3ca92b4fee5ec1e0548fa0c264faa0b55ff9ad1038&amp;source=constructor"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}