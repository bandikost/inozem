import { getProgramBySlug, hasUserProgram } from "@/lib/programm";
import ProgramSelect from "./SelectProgramm";
import { getProfile } from "@/lib/getProfile";
import Link from "next/link";
import { cookies } from "next/headers";
import MediaGallery from "@/components/ui/LazyLoad/ImageGallery";

interface ProgramsPageProps { 
   params: { slug: string } 
}

export default async function Page({ params }: ProgramsPageProps) {
  const { slug } = await params
  const program = await getProgramBySlug(slug)
  if (!program) return <div className="mt-20 text-center">Программа не найдена</div>

  const cookieStore = await cookies() 
  const token = cookieStore.get("token")?.value 
  let user = null;
  let hasAccess = false;

if (token) {
  try {
    user = await getProfile(token);
    hasAccess = await hasUserProgram(user.id, program.id);
  } catch (err) {
    console.error("Не удалось загрузить профиль:", err);
  }
}
  const dates = program.dates.split('\n').filter(Boolean)

  return (
    <section className="prose mx-auto px-6 mt-27 mb-10">
      <h1 className="!text-2xl md:!text-3xl font-semibold text-prpl text-center">{program.name}</h1>

      {!hasAccess ? ( 
        <>
        <p className="mt-4"><strong className="text-blue">Направления:</strong> <span className="opacity-60 !font-normal">{program.specialization}</span></p>
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mb-15 mt-10">

          <div className="h-full program-description border border-gray-300 rounded-md shadow-xl p-4 text-lg" dangerouslySetInnerHTML={{ __html: program.description }}/>

          <time className="h-full flex flex-col items-start border border-gray-300 rounded-md shadow-2xl p-4">
            <strong className="mb-2 text-blue text-lg">Даты проведения:</strong>
            <ul className="space-y-1 text-base grid">
              {dates.map((date, i) => (
                <li key={i} className="!text-default !font-normal opacity-80">
                  {date}
                </li>
              ))}
            </ul>
          </time>
        </div>
        

          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
            <div className="flex flex-col justify-between items-start border border-gray-300 rounded-md shadow-xl p-4">
              <h3>Подайте заявку на обучение, если у вас появились/остались вопросы, и наши сотрудники ответят вам в ближайшее время!</h3> 
              <div className="flex flex-col gap-4 lg:flex-row justify-between w-full mt-4">
                <Link className="button-more" href={"/bid"}>Подать заявку на обучение</Link>
                <Link className="button-more" href={"/contacts"}>Перейти в контакты</Link>
              </div>
              
              
            </div>

            <div className="flex flex-col items-start border border-gray-300 rounded-md shadow-2xl p-4">
              <h3>Если вы решили, что программа вам подходит, вы можете самостоятельно оплатить её и получить доступ к ближайшему старту.</h3>
              <ProgramSelect program={program} userId={user ? user.id : 0} />
            </div>
          </div>
        </>
      ) : (    
        <>
      
          <MediaGallery
                      cols="lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2"
                      items={[
                          { type: "video", src: "https://rutube.ru/play/embed/879f7e12776b516439770ec35562a67a/?p=iYvp4YZsVWzsp157-St5FA", preview: "/Images/заглушка.png" }, 
                          { type: "video", src: "https://rutube.ru/play/embed/677a8961b60e18b8157cbc8c0e1f55f8/?p=Irjso076mUsjY6y9PTJUAQ", preview: "/Images/заглушка.png" },            
                          { type: "video", src: "https://rutube.ru/play/embed/dca9d13c3ca1f2228ee4576cf6d2b5dd/?p=FBAS7jkRGN08FWo95UlAxQ", preview: "/Images/заглушка.png" },
                          { type: "video", src: "https://rutube.ru/play/embed/d7f84dcbba7fa4eed1d474dc7a7250dc/?p=FFKesrZTUxM85hScggVhLA", preview: "/Images/заглушка.png" },
                          { type: "video", src: "https://rutube.ru/play/embed/8c26b57c8e430f64132ff5985edcd73f/?p=wEnXBANxm7hlwIPB3NvYcg", preview: "/Images/заглушка.png" },
                          { type: "video", src: "https://rutube.ru/play/embed/95982addb77d9bdaffefadb792e237a9/?p=WTJFj0MsUIxjDIFNwMv5pQ", preview: "/Images/заглушка.png" },
                          { type: "video", src: "https://rutube.ru/play/embed/7255fc611b96b6cc5c1456a5f98b8778/?p=iVrXSdSnPajAj5shZCL1EQ", preview: "/Images/заглушка.png" },
                          { type: "video", src: "https://rutube.ru/play/embed/6e762270f6ac499ac4883ab9648b8545/?p=djZujsY9BaxObu1oujUy7A", preview: "/Images/заглушка.png" },
                          { type: "video", src: "https://rutube.ru/play/embed/5d3e56e73abbca27452cf38fe2198b2b/?p=e0-RRQ3kwLZfbzCnNj92eg", preview: "/Images/заглушка.png" },
                          { type: "video", src: "https://rutube.ru/play/embed/0afe213ca2eca73bae7f27d14d6fe35d/?p=Chmf4WZ8R8mMCKwio21j3Q", preview: "/Images/заглушка.png" },

                      ]}
                      />
            <h2>Инфекционная безопасность и инфекционный контроль</h2>
            <h3>Определение, классификация</h3>
            <h3>Этиология, источники инфекций</h3>
            <h3>Нормативно правовая база</h3> 
            <h3>Гигиена рук</h3>
            <h3>Стандартные меры предосторожности</h3>
            <h3>Дезинфекция</h3>
            <h3>Стерилизация изделий мед  назначения</h3>
            <h3>Профилактика проф заболеваний МР</h3>
            <h3>Обращение с медицинскими отходами</h3>

          
      
       
      </>
      )}  
    </section>
  );
}