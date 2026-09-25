import FooterNav from "./FooterNav";

const Footer = () => {
  const items = [
    {
      label: "Академия",
      links: [
        { label: "Сведения об образовательной организаци", href: "/about" },
        { label: "Кафедры", href: "/departaments" },
        { label: "Структура академии", href: "/employees" },
        { label: "Блог", href: "/blog" },
        { label: "Отзывы", href: "/feedbacks" },
      ]
    },
    {
      label: "Образование",
      links: [
        { label: "Мероприятия", href: "/activity" },
        { label: "Симуляционный центр", href: "/simcenter" },
        { label: "Образование", href: "/programs" },
        { label: "Подать заявку на обучение", href: "/bid" },
      ]
    },
    {
      label: "Аккредитация",
      links: [
        { label: "Протоколы", href: "/accreditation" },
      ]
    },
    {
      label: "Контакты",
      links: [
        { label: "Контакты", href: "/contacts" },
        { label: "+7(812)200-95-78", href: "/contacts" },
        { label: "akademuy@yandex.ru", href: "/contacts" },
      ]
    },
  ];

  return (
    <footer className="footer ">
      <FooterNav items={items} />
    </footer>
  );
};

export default Footer;
