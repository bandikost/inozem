import MediaGallery from "@/components/ui/LazyLoad/ImageGallery";

interface Props {
  education: string 
  category: string
}

export default function BaseVideo({education, category} : Props) {


    return (
      <>
      {category === "Профессиональная переподготовка" && education === "Среднее" &&(<MediaGallery cols="lg:grid-cols-3 grid-cols-1 xs:grid-cols-2 md:grid-cols-2" items={[
            { type: "video", src: "https://rutube.ru/play/embed/879f7e12776b516439770ec35562a67a/?p=iYvp4YZsVWzsp157-St5FA", preview: "/Images/заглушка.png",
              subtitles: ["Инфекционная безопасность и инфекционный контроль"]}, 
            { type: "video", src: "https://rutube.ru/play/embed/677a8961b60e18b8157cbc8c0e1f55f8/?p=Irjso076mUsjY6y9PTJUAQ", preview: "/Images/заглушка.png",
              subtitles: ["Определение, классификация"]},             
            { type: "video", src: "https://rutube.ru/play/embed/dca9d13c3ca1f2228ee4576cf6d2b5dd/?p=FBAS7jkRGN08FWo95UlAxQ", preview: "/Images/заглушка.png",
              subtitles: ["Этиология, источники инфекций"]},   
            { type: "video", src: "https://rutube.ru/play/embed/d7f84dcbba7fa4eed1d474dc7a7250dc/?p=FFKesrZTUxM85hScggVhLA", preview: "/Images/заглушка.png",
              subtitles: ["Нормативно правовая база"] },
            { type: "video", src: "https://rutube.ru/play/embed/8c26b57c8e430f64132ff5985edcd73f/?p=wEnXBANxm7hlwIPB3NvYcg", preview: "/Images/заглушка.png",
              subtitles: ["Гигиена рук"] },
            { type: "video", src: "https://rutube.ru/play/embed/95982addb77d9bdaffefadb792e237a9/?p=WTJFj0MsUIxjDIFNwMv5pQ", preview: "/Images/заглушка.png",
              subtitles: ["Стандартные меры предосторожности"] },
            { type: "video", src: "https://rutube.ru/play/embed/7255fc611b96b6cc5c1456a5f98b8778/?p=iVrXSdSnPajAj5shZCL1EQ", preview: "/Images/заглушка.png",
              subtitles: ["Дезинфекция"] },
            { type: "video", src: "https://rutube.ru/play/embed/6e762270f6ac499ac4883ab9648b8545/?p=djZujsY9BaxObu1oujUy7A", preview: "/Images/заглушка.png",
              subtitles: ["Стерилизация изделий мед  назначения"] },
            { type: "video", src: "https://rutube.ru/play/embed/5d3e56e73abbca27452cf38fe2198b2b/?p=e0-RRQ3kwLZfbzCnNj92eg", preview: "/Images/заглушка.png",
              subtitles: ["Профилактика проф заболеваний МР"] },
            { type: "video", src: "https://rutube.ru/play/embed/0afe213ca2eca73bae7f27d14d6fe35d/?p=Chmf4WZ8R8mMCKwio21j3Q", preview: "/Images/заглушка.png",
              subtitles: ["Обращение с медицинскими отходами"] },
          ]} /> )}
          </>
    )
}