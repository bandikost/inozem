import FooterNav from "./FooterNav";

const Footer = () => {
  const items = [
    {
      label: "Компания",
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
        { label: "Мероприятия", href: "/projects" },
        { label: "Симуляционный центр", href: "/projects" },
        { label: "Обучение", href: "/projects" },
      ]
    },
    {
      label: "Аккредитация",
      links: [
        { label: "Протоколы ВО", href: "/accreditation" },
        { label: "Протоколы СО", href: "/accreditation" },
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
