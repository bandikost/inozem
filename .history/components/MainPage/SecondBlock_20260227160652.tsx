import AnimatedNumber from "./components/AnimatedNumber";


export default async function SecondBlock() {

    return (
        <section className="flex flex-col mt-10">

            <div className="flex flex-col items-start">
                <h1>О нас</h1>
                <p>Какая то информация защпшсгшподпкылжад </p>
            </div>

              <div className="border border-dotted border-zinc-300 rounded shadow-2xl">
                <h1 className="text-white bg-blue text-3xl font-light px-8 py-4 rounded-t text-center gap-2">
                       Наши особенности
                </h1>
                <hr className="border-zinc-300" />
                <div className="">   
                    <ul className="w-full mt-4 text-center grid grid-cols-3 items-center justify-center gap-4 p-4">
                        <li className="text-blue text-3xl">{`>`}17 лет <p className="text-default text-sm">Предоставляем качество</p></li>
                        
                        <li className="text-prpl text-3xl">
                            <div className="flex items-center justify-center">
                                ~ <AnimatedNumber value={10}/> минут
                            </div>
                            <p className="text-default text-sm">Пешком от Дворцовой</p>
                        </li>
                    
                        <li className=" text-3xl border border-gray-200 p-4 rounded-xl">
                            <div className="flex items-center justify-center text-blue">
                                <AnimatedNumber value={15000}/>+
                            </div>
                            <p className="text-default text-sm">Слушателей, прошедших обучение</p>
                        </li>
                        
                    </ul>
                </div>
            </div>
        </section>
    )
}