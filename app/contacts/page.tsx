

export default function Page() {

return (
    <section className='flex flex-col justify-center pb-20'>
        <h1 className='text-3xl font-normal mt-12 text-prpl'>Контактная информация</h1>
        <div className="grid grid-cols-2 gap-8">
            <div className="border-2 border-dotted border-zinc-300 mt-8 rounded shadow-2xl bg-white pb-6">   
            <div className="px-6 space-y-4 text-default">
                <h2 className="text-prpl text-2xl pt-6">Телефоны</h2>
                <ul>
                    <li>Многоканальный телефон:</li>
                    <li><a href="tel:+78122009578" className="text-blue hover:underline font-medium inline-block">+7 (812) 200-95-78</a></li>
                    <li className="font-medium mb-2 mt-4">По общим вопросам:</li>
                    <li><a href="tel:+79052680094" className="text-prpl hover:underline">+7 (905) 268-00-94 (WhatsApp)</a></li>
                    <li><a href="tel:+78123347650" className="text-prpl hover:underline">+7 (812) 334-76-50</a></li>
                    <li><a href="tel:+78122446524" className="text-prpl hover:underline">+7 (812) 244-65-24</a></li>
                    <li className="font-medium mt-4">Связаться с учебным отделом:</li>
                    <li><a href="tel:+79523542697" className="text-blue hover:underline inline-block">+7 (952) 354-26-97 (WhatsApp)</a></li>
                </ul>
            </div>
            
                    <div className="space-y-4 text-default">
                        <h2 className="text-prpl text-2xl mt-4 px-6">Электронная почта</h2>
                        <ul className="px-6 text-default">
                            <li>По вопросам зачисления, обучения и т.д.</li>
                            <li><a href="mailto:akademuy@yandex.ru" className="text-blue hover:underline">akademuy@yandex.ru</a></li>
                            <li className="mt-4">Написать Директору Академии</li>
                            <li><a href="mailto:academy-medical@cmtmed.com" className="text-blue hover:underline">academy-medical@cmtmed.com</a></li>
                        </ul>
                    </div>
                        

                    <div className="space-y-4 text-default">
                        <h2 className="text-prpl text-2xl px-6 mt-4">Социальные сети</h2>
                        <a href="https://vk.com/club32353860" className="text-blue hover:underline px-6 text-default">наша группа VK</a>
                    </div>
            </div>

            <div className='border-2 border-dotted border-zinc-300 px-6 mt-8  rounded shadow-2xl bg-white'>
               <h2 className="text-prpl text-2xl py-6">Наши адреса</h2> 
                <h3 className="text-prpl text-xl mt-4">Симуляционно-тренинговый центр</h3>
                <p className="text-default text-base pb-6">Санкт-Петербург, Миллионная ул., д. 29</p>
                <iframe className="rounded mt-6" src="https://yandex.ru/map-widget/v1/?um=constructor%3A6257a2039c7175badc4451c50308ebe2a4b551bc12a26400ab4ab43414238c9d&amp;lang=ru_RU" width="100%" height="380" allowFullScreen loading="lazy" ></iframe>

            </div>
        </div>

        
    

            <div className='border-2 border-dotted border-zinc-300 pb-8 mt-8 rounded shadow-2xl bg-white'>
                <h2 className="text-prpl text-2xl p-6">Юридический адрес</h2>
                <p className="text-default px-6 text-base">Санкт-Петербург, Московский пр., д. 22, литер М, пом. Н</p>

                <h2 className="text-prpl text-2xl p-6">Реквизиты организации</h2>
                <p className="text-default px-6 text-base">Частное образовательное учреждение дополнительного профессионального образования «Академия медицинского образования им. Ф.И. Иноземцева». 190013, Санкт-Петербург, пр. Московский, д.22, литер М, пом.Н
                    <br/>Тел. +7 (812) 244-65-24
                    <br/>ИНН 7839017819 КПП 783801001
                    <br/>Филиал «Санкт-Петербургский» АО «Альфа-Банк» г. Санкт-Петербург 
                    <br/>р/с 40703810832000000005 
                    <br/>к/с 30101810600000000786 БИК 044030786</p>
            </div>
     

    </section>    
)
}