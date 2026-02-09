'use client'

import { useState, useEffect, useRef } from 'react';
import '@/styles/Slider.css';
import Image from 'next/image';


type SliderProps = {
  slides: string[]
}

const Slider: React.FC<SliderProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout | null>(null);
  const isHovered = useRef(false);

  useEffect(() => {
    const startSlider = () => {
      if (slideInterval.current) clearInterval(slideInterval.current);

      slideInterval.current = setInterval(() => {
        if (!isHovered.current) {
          setCurrent(prev => (prev + 1) % slides.length);
        }
      }, 5000);
    };

    startSlider();

    return () => {
      if (slideInterval.current) clearInterval(slideInterval.current);
    };
  }, [slides.length]);

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };


  return (
    <div
      className="slider-container shadow-2xl border-2 border-dotted border-zinc-300 rounded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="slider-wrapper"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, idx) => (
         <div className="slider-slide">
  <div className="slide-image">
    <Image
      src={slide}
      alt={`Slide ${idx + 1}`}
      fill
      priority={idx === 0}
      sizes="(max-width: 1200px) 100vw, 1200px"
      className="rounded object-cover"
    />
  </div>
</div>

        ))}
      </div>

    </div>
  );
};

export default Slider;
