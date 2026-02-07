'use client';

import { useEffect, useState, useRef } from 'react';

type AnimatedNumberProps = {
  value: number;
  duration?: number;
};

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, duration = 1500 }) => {
  const [current, setCurrent] = useState(0);
  const start = useRef<number | null>(null);
  const hasAnimated = useRef(false);

  const animate = () => {
    const step = (timestamp: number) => {
      if (!start.current) start.current = timestamp;
      const progress = timestamp - start.current;
      const percentage = Math.min(progress / duration, 1);
      setCurrent(Math.floor(percentage * value));

      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animate();
        }
      },
      { threshold: 0.5 } 
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
    };
  }, [value]);

  return <div ref={elementRef}>{current.toLocaleString()}</div>;
};

export default AnimatedNumber;
