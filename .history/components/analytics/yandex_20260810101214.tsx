"use client";

import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    ym: (...args: any[]) => void;
  }
}

export default function YandexMetrika() {
  const pathname = usePathname();

  // Отправляем хит при каждой смене маршрута
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      typeof window.ym === "function"
    ) {
      window.ym(111451816, "hit", pathname);
    }
  }, [pathname]);

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){
                (m[i].a=m[i].a||[]).push(arguments)
              };
              m[i].l=1*new Date();

              for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) {
                  return;
                }
              }

              k=e.createElement(t),
              a=e.getElementsByTagName(t)[0],
              k.async=1,
              k.src=r,
              a.parentNode.insertBefore(k,a)
            })(window, document, 'script',
              'https://mc.yandex.ru/metrika/tag.js',
              'ym'
            );

            ym(111451816, 'init', {
              clickmap: true,
              trackLinks: true,
              accurateTrackBounce: true,
              webvisor: true,
              ecommerce: "dataLayer"
            });
          `,
        }}
      />

      <noscript>
        <div>
          <img
            src="https://mc.yandex.ru/watch/111451816"
            style={{
              position: "absolute",
              left: "-9999px",
            }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}