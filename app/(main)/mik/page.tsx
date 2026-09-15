
'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './styles/styles.module.css';
import { useEffect } from 'react';
import LoadingLink from '@/components/Load/LoadingLink';

export default function ConferencePage() {
  
  useEffect(() => {
    const burger = document.querySelector(`.${styles.burger}`);
    const mobileMenu = document.querySelector(`.${styles.mobileMenu}`);
    const mobileClose = document.querySelector(
      `.${styles.mobileMenu__close}`
    );

    const closeMenu = () => {
      if (mobileMenu) {
        mobileMenu.classList.remove(styles.open);
      }
    };

    const openMenu = () => {
      if (mobileMenu) {
        mobileMenu.classList.add(styles.open);
      }
    };

    const handleMenuClick = (event: Event) => {
      if (event.target === mobileMenu) {
        closeMenu();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    if (burger && mobileMenu) {
      burger.addEventListener('click', openMenu);

      if (mobileClose) {
        mobileClose.addEventListener('click', closeMenu);
      }

      mobileMenu
        .querySelectorAll(`.${styles.mobileMenu__links} a`)
        .forEach((link) => {
          link.addEventListener('click', closeMenu);
        });

      mobileMenu.addEventListener('click', handleMenuClick);
      document.addEventListener('keydown', handleKeyDown);
    }

    const items = document.querySelectorAll(`.${styles.reveal}`);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.active);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    items.forEach((el) => observer.observe(el));

    return () => {
      if (burger && mobileMenu) {
        burger.removeEventListener('click', openMenu);

        if (mobileClose) {
          mobileClose.removeEventListener('click', closeMenu);
        }

        mobileMenu
          .querySelectorAll(`.${styles.mobileMenu__links} a`)
          .forEach((link) => {
            link.removeEventListener('click', closeMenu);
          });

        mobileMenu.removeEventListener('click', handleMenuClick);
        document.removeEventListener('keydown', handleKeyDown);
      }

      observer.disconnect();
    };
  }, []);

  return (
    <>
      <section className={styles.hero}>
        <video
          className={styles.hero__video}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="./video/main.mp4" type="video/mp4" />
        </video>

        <div className={styles.hero__content}>
          <div className={styles.container}>
            <div className={styles.hero__date}>
              13 - 14 октября 2026
            </div>

            <h1 className={styles.hero__title}>
              IX межрегиональная научно-практическая конференция
              <br />
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

      <section className={styles.info}>
        <div className={`${styles.container} ${styles.info__grid}`}>
          <div className={styles.info_container}>
            <div className={styles.info__block}>
              <div className={styles.info__num}>01</div>

              <h2 className={styles.info__title}>
                О КОНФЕРЕНЦИИ
              </h2>

              <p className={styles.info__text}>
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

          <div className={styles.info_container}>
            <div className={styles.info__block}>
              <div className={styles.info__num}>02</div>

              <h2 className={styles.info__title}>
                ОБ ОРГАНИЗАТОРЕ
              </h2>

              <p className={styles.info__text}>
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

          <div className={styles.info__block}>
            <div className={styles.info__num}>03</div>

            <h2 className={styles.info__title}>
              КЛЮЧЕВЫЕ ТЕМЫ 2026
            </h2>

            <ul className={styles.topics}>
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

      <section className={styles.stats}>
        <div className={`${styles.container} ${styles.stats__grid}`}>
          <div className={styles.stats__item}>
            <div className={styles.stats__num}>8 000+</div>
            <div className={styles.stats__label}>
              участников за 8 лет
            </div>
          </div>

          <div className={styles.stats__item}>
            <div className={styles.stats__num}>72</div>
            <div className={styles.stats__label}>
              региона России
            </div>
          </div>

          <div className={styles.stats__item}>
            <div className={styles.stats__num}>12</div>
            <div className={styles.stats__label}>
              стран-участниц
            </div>
          </div>

          <div className={styles.stats__item}>
            <div className={styles.stats__num}>175+</div>
            <div className={styles.stats__label}>
              докладчиков
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bannerSection}>
        <Image
          className={styles.bannerBg}
          src="/Images/mic/banner.png"
          alt=""
          width={1920}
          height={500}
          priority
        />
      </section>

      <section className={styles.partners}>
        <div className={styles.partners__double}>
          <div className={styles.partners__doubleCol}>
            <h2 className={styles.partners__title}>
              Организаторы конференции
            </h2>

            <div className={styles.partners__logos}>
              <div className={styles.partners__item}>
                <Image
                  src="/Images/mic/partners/1.1.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>

              <div className={styles.partners__item}>
                <Image
                  src="/Images/mic/partners/1.2.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>

              <div className={styles.partners__item}>
                <Image
                  src="/Images/mic/partners/1.3.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>
            </div>
          </div>

          <div className={styles.partners__divider} />

          <div className={styles.partners__doubleCol}>
            <h2 className={styles.partners__title}>
              При поддержке
            </h2>

            <div className={styles.partners__logos}>
              <div className={styles.partners__item}>
                <Image
                  src="/Images/mic/partners/2.1.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>

              <div className={styles.partners__item}>
                <Image
                  src="/Images/mic/partners/2.2.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>

              <div className={styles.partners__item}>
                <Image
                  src="/Images/mic/partners/2.3.webp"
                  alt="logo"
                  width={200}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>

        <h3
          className={styles.partners__subtitle}
          style={{ marginTop: '80px' }}
        >
          ГАЛЕРЕЯ
        </h3>

        <div className={styles.slider}>
          <Swiper
            className="mySwiper"
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={2}
            spaceBetween={10}
            centeredSlides
            loop
            grabCursor
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              1200: {
                slidesPerView: 2,
              },
            }}
          >
            <SwiperSlide>
              <Image
                src="/Images/mic/slider/2.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                src="/Images/mic/slider/1.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                src="/Images/mic/slider/3.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                src="/Images/mic/slider/4.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>

            <SwiperSlide>
              <Image
                src="/Images/mic/slider/5.jpg"
                alt=""
                width={1920}
                height={1080}
              />
            </SwiperSlide>
          </Swiper>
        </div>

        <h3
          className={styles.partners__subtitle}
          style={{
            backgroundColor: '#ad217b',
            padding: '20px 0px',
            fontSize: '36px',
          }}
        >
          СТОИМОСТЬ УЧАСТИЯ БЕСПЛАТНО
        </h3>
      </section>

      <section className={styles.audience}>
        <div className={styles.container}>
          <h2 className={styles.audience__title}>
            КТО УЧАСТВУЕТ
          </h2>

          <div className={styles.audience__grid}>
            <div className={styles.audience__item}>
              <div className={styles.audience__icon}>01</div>
              <p>
                Руководители и заместители руководителей медицинских
                организаций
              </p>
            </div>

            <div className={styles.audience__item}>
              <div className={styles.audience__icon}>02</div>
              <p>
                Представители органов исполнительной власти в сфере
                здравоохранения
              </p>
            </div>

            <div className={styles.audience__item}>
              <div className={styles.audience__icon}>03</div>
              <p>
                Специалисты по контролю качества и безопасности
                медицинской деятельности
              </p>
            </div>

            <div className={styles.audience__item}>
              <div className={styles.audience__icon}>04</div>
              <p>
                Главные медицинские сёстры, специалисты с высшим
                медицинским образованием
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.results}>
        <div className={styles.container}>
          <div className={styles.results__inner}>
            <div className={styles.results__left}>
              <h2 className={styles.results__title}>
                ОБРАЗОВАТЕЛЬНЫЕ
                <br />
                РЕЗУЛЬТАТЫ
              </h2>

              <p className={styles.results__sub}>
                По итогам конференции участники получат практический
                опыт, который можно применить сразу.
              </p>
            </div>

            <ul className={styles.results__list}>
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

      <section className={styles.formats}>
        <div className={styles.container}>
          <h2 className={styles.formats__title}>
            ФОРМАТЫ УЧАСТИЯ
          </h2>

          <div className={styles.formats__grid}>
            <div className={styles.formats__card}>
              <div className={styles.formats__tag}>Очно</div>

              <h3>Аудиторное участие</h3>

              <p>
                Санкт-Петербург, КВЦ «Экспофорум», Петербургское шоссе,
                64/1. Регистрация на стойке с индивидуальным бейджем и
                контролем присутствия.
              </p>
            </div>

            <div
              className={`${styles.formats__card} ${styles.formats__cardAccent}`}
            >
              <div className={styles.formats__tag}>Онлайн</div>

              <h3>Дистанционное участие</h3>

              <p>
                Трансляция на платформе Pruffme. Ссылка отправляется за
                сутки и за час до начала. Учёт присутствия по времени
                подключения.
              </p>
            </div>

            <div className={styles.formats__card}>
              <div className={styles.formats__tag}>Доклад</div>

              <h3>Выступить докладчиком</h3>

              <p>
                Поделитесь опытом вашей организации с профессиональным
                сообществом. Подайте заявку на участие в качестве спикера.
              </p>
            </div>
          </div>

          <p className={styles.formats__note}>
            Мероприятие подано в Комиссию по оценке учебных мероприятий
            Координационного совета по развитию НМО Минздрава России.
          </p>
        </div>
      </section>

      <section
        className={`${styles.section} ${styles.sectionContact}`}
      >
        <div className={styles.contactContainer}>
          <h2
            className={`${styles.sectionTitle} ${styles.reveal}`}
          >
            СТАТЬ УЧАСТНИКОМ МИК СЗФО
          </h2>

          <LoadingLink className={styles.btn} href="mailto:akademuy@yandex.ru?subject=МИК 2026 | Заявка&body=Здравствуйте!%0AХочу стать участником МИК СЗФО">
            подать заявку
          </LoadingLink>
        </div>
      </section>

      <section
        id="location"
        className={`${styles.section} ${styles.sectionMap}`}
      >
        <div className={styles.map__inner}>
          <div className={styles.map__text}>
            <p className={styles.map__label}>
              МЕСТО ПРОВЕДЕНИЯ
            </p>

            <h2 className={styles.map__title}>
              Петербургский международный форум здоровья
            </h2>

            <p className={styles.map__dates}>
              13–15 октября 2026 · Экспофорум
            </p>

            <p className={styles.map__desc}>
              Конференция «Медицина и качество» проходит в рамках ПМФЗ —
              одного из ключевых конгрессно-выставочных событий в сфере
              здравоохранения, проводимого с 2013 года.
            </p>

            <p className={styles.map__desc}>
              Лидеры отрасли, профессиональное сообщество и инновационные
              решения на одной площадке. Форум охватывает основные разделы
              отрасли: насыщенная конгрессно-деловая программа и
              специализированная выставочная экспозиция.
            </p>

            <div className={styles.map__address}>
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

          <div className={styles.map__frame}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor%3Ae712921275ab10fdd9d63b3ca92b4fee5ec1e0548fa0c264faa0b55ff9ad1038&source=constructor"
              frameBorder="0"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
