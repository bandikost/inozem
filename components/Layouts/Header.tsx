
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
        { label: "Мероприятия", href: "/projects", ariaLabel: "Наши проекты" },
        { label: "Симуляционный центр", href: "/projects", ariaLabel: "Наши проекты" },
      ]
    },
    
     {
      label: "Аккредитация",
      bgColor: "#754883", 
      textColor: "#fff",
      links: [
        { label: "Протоколы ВО", href: "/accreditation", ariaLabel: "Протоколы высшего образования" },
        { label: "Протоколы СО", href: "/accreditation", ariaLabel: "Аккредитация среднего образования" },
      ]
    },
    {
      label: "Обратная связь",
      bgColor: "#754883", 
      textColor: "#fff",
      links: [
        { label: "Отзывы", href: "/feedback", ariaLabel: "Отзывы" },
        { label: "Контакты", href: "/contacts", ariaLabel: "Наши контакты" },
      ]
    },
     {
      label: "Пользователь",
      bgColor: "#754883", 
      textColor: "#fff",
      links: [
        { label: "Личный кабинет", href: "/profile", ariaLabel: "Личный кабинет пользователя" },
      ]
    },
    
   
  ];



  return (
   <CardNav items={items} menuColor="#000" ease="power3.out"/>
  )
}

export default Header
