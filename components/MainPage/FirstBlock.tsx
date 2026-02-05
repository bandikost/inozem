import Link from "next/link";


export default function FirstBlock() {

    return (
        <section className="border border-dotted border-zinc-300 py-4 rounded">
            <div className="grid grid-cols-2 justify-center p-6">
                <div className="flex flex-col">
                    <h1 className="text-prpl text-3xl font-light">Современные технологии в медицине, образовании и бизнесе!</h1>
                    <ul className="w-full max-w-[580px] grid grid-cols-1 gap-6">
                        <li className="mt-4">Академия Иноземцева рада приветствовать Вас!</li>
                        <li>У нас вы получите качественное обучение, направленное на формирование ключевых компетенций современного специалиста. Мы оказываем услуги по дополнительному профессиональному образованию медицинских работников с высшим и средним уровнем медицинского образования.</li>
                
                    </ul>
                </div>
                <div className="flex flex-col items-center gap-4 mt-4">
                    <h1 className="text-default text-xl">Сопровождение аккредитации</h1>
                    <Link className="text-center w-1/2 px-4 py-2 bg-prpl text-white rounded hover:opacity-80" href="/">Подать заявку</Link>
                    <Link className="text-center w-1/2 px-4 py-2 bg-blue text-white rounded hover:opacity-80" href="/register">Бесплатная регистрация</Link>
                </div>
            </div>
            <p className="px-6">Все услуги лицензированы в соответствии с Российским законодательством. Перечень услуг включает проведение стажировок на базах практического обучения, тренингов, семинаров, мастер-классов, сопровождение для получения допуска к профессиональной деятельности, организацию образовательных мероприятий и прочее.</p>
        </section>
    )
}