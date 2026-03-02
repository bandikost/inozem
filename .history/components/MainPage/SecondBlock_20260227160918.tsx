import AnimatedNumber from "./components/AnimatedNumber";


export default async function SecondBlock() {

    return (
        <section className="flex flex-col mt-10">

            <div className="flex flex-col items-start">
                <h1>О нас</h1>
                <p>Какая то информация защпшсгшподпкылжад </p>
            </div>
                 
            <ul className="w-full mt-4 text-center grid grid-cols-3 items-center justify-center gap-4 p-4">
                <li className="text-blue text-3xl border border-gray-200 py-4 rounded-xl shadow-xl">
                    {`>`}17 лет <p className="text-default text-sm">Предоставляем качество</p>
                </li>
            
                <li className="text-prpl text-3xl border border-gray-200 py-8 rounded-xl shadow-xl">
                    <div className="flex items-center justify-center">
                        ~ <AnimatedNumber value={10}/> минут
                    </div>
                    <p className="text-default text-sm">Пешком от Дворцовой</p>
                </li>
                    
                <li className=" text-3xl border border-gray-200 py-4 rounded-xl shadow-xl">
                    <div className="flex items-center justify-center text-blue">
                        <AnimatedNumber value={15000}/>+
                    </div>
                    <p className="text-default text-sm">Слушателей, прошедших обучение</p>
                </li>
                        
            </ul>
        </section>
    )
}