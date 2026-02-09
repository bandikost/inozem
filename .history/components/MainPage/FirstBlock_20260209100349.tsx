import Link from "next/link";


export default function FirstBlock() {

    return (
        <section className="border-2 border-dotted border-zinc-300 pb-8 mt-4 rounded shadow-2xl bg-white">
            <div className="grid grid-cols-2 justify-center px-6 py-4">
                <div className="flex flex-col">
                    <h1 className="text-prpl text-3xl font-light">Современные технологии в медицине, образовании и бизнесе!</h1>
                    <ul className="w-full max-w-[580px] grid grid-cols-1 gap-6">
                        <li className="mt-4">Академия Иноземцева рада приветствовать Вас!</li>
                        <li>У нас вы получите качественное обучение, направленное на формирование ключевых компетенций современного специалиста. Мы оказываем услуги по дополнительному профессиональному образованию медицинских работников с высшим и средним уровнем медицинского образования.</li>
                
                    </ul>
                </div>
                <div className="flex flex-col items-center gap-4 mt-4">
                    <h1 className="text-default text-xl">Сопровождение аккредитации</h1>
                    <Link href="/" className="button-blue">Подать заявку</Link>
                    <Link href="/register" className="button-prpl">Бесплатная регистрация</Link>
                </div>
            </div>
            <p className="px-6">Все услуги лицензированы в соответствии с Российским законодательством. Перечень услуг включает проведение стажировок на базах практического обучения, тренингов, семинаров, мастер-классов, сопровождение для получения допуска к профессиональной деятельности, организацию образовательных мероприятий и прочее.</p>
        </section>
    )
}