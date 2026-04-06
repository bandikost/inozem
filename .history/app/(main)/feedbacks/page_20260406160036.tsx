

export default async function Page() {

    return ( 
        <section className='flex flex-col justify-center pb-20 px-4'>
            <h1 className='mt-27 text-prpl text-center'>Отзывы об академии</h1>
            <div style="width:560px;height:800px;overflow:hidden;position:relative;">
                <iframe style="width:100%;height:100%;border:1px solid #e6e6e6;border-radius:8px;box-sizing:border-box" src="https://yandex.ru/maps-reviews-widget/226327670406?comments"></iframe>
<a href="https://yandex.ru/maps/-/CPfSVMZ~" target="_blank" style="box-sizing:border-box;text-decoration:none;color:#b3b3b3;font-size:10px;font-family:YS Text,sans-serif;padding:0 20px;position:absolute;bottom:8px;width:100%;text-align:center;left:0">Усадьба Измайлово на карте Москвы — Яндекс.Карты</a>
</div>
        </section>
    )
}