'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const AnimatedWrapper = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={twMerge('transition-opacity duration-1000 ease-in-out', isVisible ? 'opacity-100' : 'opacity-0')}
    >
      {children}
    </div>
  );
};
