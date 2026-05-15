import MediaGallery from "@/components/ui/LazyLoad/ImageGallery";
          
          
          
export default function BaseVideo() {
          
    return (
        <MediaGallery cols="lg:grid-cols-3 grid-cols-1 xs:grid-cols-2 md:grid-cols-2" items={[
            { type: "video", src: "https://rutube.ru/play/embed/3920cbd65fa8bac074d5fb388bbd4f4b?p=vhj9_s6syl7OQtbJxxfjVw", preview: "/Images/заглушка.png",
                subtitles: ["Инфекционная безопасность и инфекционный контроль"]}, 
            { type: "video", src: "https://rutube.ru/play/embed/f6ff6b806cfd0c7160c3dddaa4a0343b?p=vXG5-R_pu63prfwVEuddBA", preview: "/Images/заглушка.png",
                subtitles: ["Определение, классификация"]},             
            { type: "video", src: "https://rutube.ru/play/embed/41c12a40a872e66b5e62600014bf4b4d/?p=dQHK3almj9ORFhF9pbuUlg", preview: "/Images/заглушка.png",//
                subtitles: ["Этиология, источники инфекций"]},   
            { type: "video", src: "https://rutube.ru/play/embed/0d1fd7483d9e94169a9e8c9764917c09?p=Q3MoRBv5YhYKKHUPOwfHbw", preview: "/Images/заглушка.png",
                subtitles: ["Нормативно правовая база"] },
            { type: "video", src: "https://rutube.ru/play/embed/80d0ce0d17d170010290288425ea63f3?p=xv1k03tFGNaMakHN0O6eWw", preview: "/Images/заглушка.png",
                subtitles: ["Гигиена рук"] },
            { type: "video", src: "https://rutube.ru/play/embed/7c8374041742268dcecf4047a227a872?p=8gSWJZkILKHXP9OoaW9wpw", preview: "/Images/заглушка.png",
                subtitles: ["Стандартные меры предосторожности"] },
           
        ]} />
    )
}