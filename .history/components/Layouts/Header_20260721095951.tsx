import CardNav from './CardNav';


const Header = () => {

  const items = [
    {
      label: "Академия",
      bgColor: "#754883",
      textColor: "#fff",
      links: [
      //  { label: "Блог", href: "/blog", ariaLabel: "Наш Блог" },
        { label: "Кафедры", href: "/", ariaLabel: "Кафедры" },
        { label: "Сотрудники", href: "/employees", ariaLabel: "Сотрудники" },
        { label: "Сведения об образовательной организации", href: "/about", ariaLabel: "Сведения об образовательной организации" },
      ]
    },
    {
      label: "Обучающие программы", 
      bgColor: "#754883",
      textColor: "#fff",
      links: [
        { label: "Образование", href: "/programs", ariaLabel: "Образование" },
        { label: "Мероприятия", href: "/activity", ariaLabel: "Мероприятия" },
        { label: "Аккредитация", href: "/accreditation", ariaLabel: "Протоколы аккредитации" },
        { label: "Симуляционный центр", href: "/simcenter", ariaLabel: "Симуляционный центр" },
      ]
    },
    
    {
      label: "Пользователь",
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
