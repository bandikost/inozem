
import '@/styles/CardNav.css';
import CardNav from './CardNav';



const Header = () => {

  const items = [
    {
      label: "Компания",
      bgColor: "#FD7081",
      textColor: "#fff",
      links: [
        { label: "О Нас", href: "/about", ariaLabel: "О нас" },
        { label: "Кафедры", href: "/", ariaLabel: "Кафедры" },
        { label: "Сотрудники", href: "/", ariaLabel: "Сотрудники" },
        { label: "Блог", href: "/blog", ariaLabel: "Наш Блог" },
        { label: "Отзывы", href: "/feedback", ariaLabel: "Отзывы" },
      ]
    },
    {
      label: "Обучение", 
      bgColor: "#FD7081",
      textColor: "#fff",
      links: [
        { label: "Мероприятия", href: "/projects", ariaLabel: "Наши проекты" },
        { label: "Симуляционный центр", href: "/projects", ariaLabel: "Наши проекты" },
        { label: "Обучение", href: "/projects", ariaLabel: "Наши проекты" },
      ]
    },
    
     {
      label: "Аккредитация",
      bgColor: "#FD7081", 
      textColor: "#fff",
      links: [
        { label: "Протоколы ВО", href: "/accreditation", ariaLabel: "Протоколы высшего образования" },
        { label: "Протоколы СО", href: "/accreditation", ariaLabel: "Аккредитация среднего образования" },
      ]
    },
    {
      label: "Контакты",
      bgColor: "#FD7081", 
      textColor: "#fff",
      links: [
        { label: "Контакты", href: "/contacts", ariaLabel: "Наши контакты" },
      ]
    },
    
  ];



  return (
   <CardNav
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#170D27"
      buttonTextColor="#fff"
      ease="power3.out"
      
    />
  );
};

export default Header;
