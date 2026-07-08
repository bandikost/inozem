'use client'

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > 400);
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Наверх"
            className={`
                fixed
                bottom-6
                left-6
                z-50

                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-full

                bg-prpl
                text-white

                shadow-xl
                cursor-pointer
                transition-all
                duration-300

                hover:scale-110
                hover:shadow-2xl

                ${
                    visible
                        ? "translate-y-0 opacity-100"
                        : "pointer-events-none translate-y-5 opacity-0"
                }
            `}
        >
            <ArrowUp size={22} />
        </button>
    );
}