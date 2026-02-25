
import '@/styles/CardNav.css';
import CardNav from './CardNav';



const Header = () => {

  const items = [
    {
      label: "Компания",
      bgColor: "#754883",
      textColor: "#fff",
      links: [
        { label: "Блог", href: "/blog", ariaLabel: "Наш Блог" },
        { label: "О Нас", href: "/about", ariaLabel: "О нас" },
        { label: "Кафедры", href: "/", ariaLabel: "Кафедры" },
        { label: "Сотрудники", href: "/", ariaLabel: "Сотрудники" },
      ]
    },
    {
      label: "Обучающие программы", 
      bgColor: "#754883",
      textColor: "#fff",
      links: [
        { label: "Обучение", href: "/projects", ariaLabel: "Наши проекты" },
        { label: "Аккредитация", href: "/accreditation", ariaLabel: "Протоколы" },
        { label: "Мероприятия", href: "/projects", ariaLabel: "Наши проекты" },
        { label: "Симуляционный центр", href: "/projects", ariaLabel: "Наши проекты" },
      ]
    },
    
    {
      label: "Для пользователя",
      bgColor: "#754883", 
      textColor: "#fff",
      links: [
        { label: "Отзывы", href: "/feedbacks", ariaLabel: "Отзывы" },
        { label: "Контакты", href: "/contacts", ariaLabel: "Наши контакты" },
        { label: "Личный кабинет", href: "/profile", ariaLabel: "Личный кабинет пользователя" },
      ]
    },
    
   
  ];



  return (
   <CardNav items={items} menuColor="#000" ease="power3.out"/>
  )
}

export default Header
