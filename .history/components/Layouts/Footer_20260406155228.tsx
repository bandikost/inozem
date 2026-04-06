import FooterNav from "./FooterNav";

const Footer = () => {
  const items = [
    {
      label: "Академия",
      links: [
        { label: "О Нас", href: "/about" },
        { label: "Кафедры", href: "/" },
        { label: "Сотрудники", href: "/" },
        { label: "Блог", href: "/blog" },
        { label: "Отзывы", href: "/feedback" },
      ]
    },
    {
      label: "Обучение",
      links: [
        { label: "Мероприятия", href: "/activity" },
        { label: "Симуляционный центр", href: "/simcenter" },
        { label: "Обучение", href: "/programs" },
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
