

export default function ThirdBlock() {

    return (
        <section className="border border-dotted border-zinc-300 py-4 rounded hover:shadow-2xl">
            <h1 className="text-prpl text-3xl font-light px-6 rounded-t flex items-start">Наши особенности</h1>
            <hr className="border-zinc-200 mt-2" />
            <ul className="grid grid-cols-3 gap-4 px-6 mt-8 pb-10">
                <li className="text-blue text-2xl">17 лет <p className="text-default text-sm">Предоставляем качество</p></li>
                <li className="text-prpl text-2xl">10 минут<p className="text-default text-sm">Предоставляем качество</p></li>
                <li className="text-blue text-2xl">Более 15400<p className="text-default text-sm">Предоставляем качество</p></li>
            </ul>
        </section>
    )
}