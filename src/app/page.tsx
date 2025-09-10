'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

const MENU_DATA = [
  { title: 'ABOUT', href: '#' },
  { title: 'WORKS', href: '#' },
  { title: 'ARCHIVE', href: '#' },
  { title: 'CONTACT', href: '#' },
];

const MENU_ID = 'menu';

const SectionHeading = ({ text }: { text: string }) => {
  return (
    <div className="sticky top-0 z-10 bg-white px-2 py-6 text-stone-600 md:px-4">
      <p className="text-center font-serif text-base tracking-[-.02em] md:text-left md:text-lg">{text}</p>
    </div>
  );
};

const SectionText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <p className={twMerge('text-center text-xs whitespace-pre-line text-stone-600 md:text-sm', className)}>{text}</p>
  );
};

const AnimatedWrapper = ({ children }: { children: ReactNode }) => {
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

export default function Home() {
  const [blurValue, setBlurValue] = useState(8); // Initial blur value in pixels
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    if (isMenuOpen) {
      document.querySelector('body')?.classList.add('overflow-hidden');
    } else {
      document.querySelector('body')?.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  return (
    <div className="flex flex-col bg-white">
      <main className="flex grow flex-col">
        <div className="grid h-screen grow place-items-center">
          <div className="fixed z-20 mb-6 flex w-full px-4 font-serif text-xs text-white mix-blend-difference sm:px-6">
            <h1 className="grow tracking-[.2em]">
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="cursor-pointer"
              >
                KAZUYA HASHIMOTO
              </button>
            </h1>
            <ul className="hidden items-center gap-[80px] tracking-[-.02em] md:flex lg:gap-[120px]">
              {MENU_DATA.map((item) => (
                <li key={item.title}>
                  <Link href={item.href} className="transition-opacity ease-in hover:opacity-50">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <button
              type="button"
              aria-controls={MENU_ID}
              aria-expanded={isMenuOpen}
              aria-haspopup="true"
              aria-label="Open menu"
              onClick={() => {
                setIsMenuOpen(true);
              }}
              className="absolute top-[50%] right-2 -translate-y-1/2 transform cursor-pointer p-3 tracking-[-.02em] transition-opacity ease-in hover:opacity-50 sm:right-3 md:hidden"
            >
              MENU
            </button>
          </div>
          <div
            id={MENU_ID}
            role="menu"
            className={twMerge(
              'fixed top-0 left-0 z-30 flex h-full w-full items-center backdrop-blur-xl transition-opacity duration-300 ease-in-out',
              isMenuOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
            )}
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            <ul className="mb-6 flex flex-col gap-4">
              {MENU_DATA.map((item, index) => (
                <li
                  key={item.title}
                  className={twMerge(
                    'p-4 text-center transition-all duration-300 ease-in-out',
                    isMenuOpen ? 'opacity-100' : 'opacity-0',
                  )}
                  style={{
                    transitionDelay: isMenuOpen ? `${index * 100}ms` : `${(MENU_DATA.length - 1 - index) * 100}ms`,
                  }}
                >
                  <Link
                    href={item.href}
                    className="font-serif text-lg text-stone-800"
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="relative mb-6 grow px-4 text-right">
              <button className="absolute top-[50%] right-2 -translate-y-1/2 cursor-pointer p-3 font-serif text-xs text-stone-600">
                CLOSE
              </button>
            </div>
          </div>
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/top_main.jpg"
              alt=""
              priority={true}
              fill={true}
              objectFit="cover"
              loading="eager"
              className="scale-110"
              style={{ filter: `blur(${blurValue}px)` }}
            />
          </div>
        </div>
        <div className="pb-20">
          <div className="mx-4 md:mx-0">
            <SectionHeading text="Snapshot" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <AnimatedWrapper>
                  <Image
                    src="/top_snap_1.jpg"
                    width={3840}
                    height={2539}
                    alt=""
                    className="aspect-[3/2] object-contain"
                  />
                </AnimatedWrapper>
                <SectionText text={'「 」\nISO 200, F4.0, 1/500s'} />
              </div>
              <div className="md:col- flex flex-col gap-2 md:col-start-2 md:row-start-2">
                <AnimatedWrapper>
                  <Image
                    src="/top_snap_2.jpg"
                    width={552}
                    height={368}
                    alt=""
                    className="aspect-[3/2] h-full w-full object-contain md:col-start-2 md:row-start-1"
                  />
                </AnimatedWrapper>
                <SectionText text={'「 」\nISO 200, F4.0 ,1/90s, 28mm'} className="md:col-start-1 md:row-start-1" />
              </div>
            </div>
          </div>
          <div className="mx-4 mt-8 md:mx-0">
            <SectionHeading text="Abstract" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="flex flex-col gap-2">
                <AnimatedWrapper>
                  <Image
                    src="/top_abstract_1.jpg"
                    width={1920}
                    height={2881}
                    alt=""
                    className="aspect-[3/2] h-full w-full object-contain"
                  />
                </AnimatedWrapper>
                <SectionText text={'「 」\nISO 200, F4.0, 1/500s'} />
              </div>
              <div className="md:col- flex flex-col gap-2 md:col-start-2 md:row-start-2">
                <AnimatedWrapper>
                  <Image
                    src="/top_abstract_2.jpg"
                    width={2080}
                    height={3120}
                    alt=""
                    className="aspect-[3/2] h-full w-full object-contain md:col-start-2 md:row-start-1"
                  />
                </AnimatedWrapper>
                <SectionText text={'「 」\nISO 200, F4.0 ,1/90s, 28mm'} className="md:col-start-1 md:row-start-1" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="fixed bottom-0 z-10 w-full p-4 text-center font-serif text-sm text-white mix-blend-difference">
        <small>&copy; kazuya hashimoto</small>
      </footer>
    </div>
  );
}
