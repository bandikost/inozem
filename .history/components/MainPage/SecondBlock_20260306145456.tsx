import AnimatedNumber from "./components/AnimatedNumber";


export default async function SecondBlock() {

    return (
        <section className="w-full flex flex-col  gap-4 mt-20">

            <div className="flex flex-col items-center tablet:items-start px-4">
                <p>skofjkg</p>
                <h2 className="text-prpl">О нас</h2>
                <p className="mt-2 text-center">Какая то информация защпшсгшподпкылжад asdasdasd</p>
            </div>
                 <div className="flex flex-col items-center">
            <ul className="w-full max-w-full mt-4 text-center grid grid-cols-1 md:grid-cols-3 gap-5 items-center justify-center p-4">

                <li className="w-full max-w-[400px] md:max-w-full mx-auto text-blue text-3xl border border-gray-300 py-10 tablet:py-8 rounded-xl shadow-xl">
                    {`>`}17 лет <p className="text-default text-sm">Предоставляем качество</p>
                </li>
            
                <li className="w-full max-w-[400px] md:max-w-full mx-auto text-prpl text-3xl border border-gray-300 py-10 tablet:py-8 rounded-xl shadow-xl ">
                    <div className="flex items-center justify-center">
                        ~ <AnimatedNumber value={10}/> минут
                    </div>
                    <p className="text-default text-sm">Пешком от Дворцовой</p>
                </li>
                    
                <li className="w-full max-w-[400px] md:max-w-full mx-auto text-3xl border border-gray-300 py-8 rounded-xl shadow-xl">
                    <div className="flex items-center justify-center text-blue">
                        <AnimatedNumber value={15000}/>+
                    </div>
                    <p className="text-default text-sm px-3">Слушателей, прошедших обучение</p>
                </li>
                        
            </ul>
            </div>
        </section>
    )
}