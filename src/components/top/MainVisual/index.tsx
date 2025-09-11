'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export const MainVisual = () => {
  const [blurValue, setBlurValue] = useState(8); // Initial blur value in pixels

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newBlurValue = Math.max(0, 8 - scrollY / 50); // Decrease blur as user scrolls
      setBlurValue(newBlurValue);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src="/top_main.jpg"
        alt=""
        priority={true}
        fill={true}
        loading="eager"
        className="scale-110 object-cover"
        style={{ filter: `blur(${blurValue}px)` }}
      />
    </div>
  );
};
