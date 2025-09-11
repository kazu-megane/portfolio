'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const MENU_DATA = [
  { title: 'ABOUT', href: '/about' },
  { title: 'WORKS', href: '#' },
  { title: 'ARCHIVE', href: '#' },
  { title: 'CONTACT', href: '#' },
];
const MENU_ID = 'header-menu';

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.querySelector('body')?.classList.add('overflow-hidden');
    } else {
      document.querySelector('body')?.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={twMerge('relative flex px-4 font-serif text-xs text-white mix-blend-difference sm:px-6', className)}
      >
        <h1 className={twMerge('grow tracking-[.2em]', isMenuOpen ? 'hidden' : '')}>
          <Link href="/">KAZUYA HASHIMOTO</Link>
        </h1>
        <nav aria-label="メイン" className="hidden md:block">
          <ul className="flex items-center gap-[80px] tracking-[-.02em] lg:gap-[120px]">
            {MENU_DATA.map((item) => (
              <li key={item.title}>
                <Link href={item.href} className="transition-opacity ease-in hover:opacity-50">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          aria-controls={MENU_ID}
          aria-expanded={isMenuOpen}
          aria-haspopup="true"
          aria-label="Open menu"
          onClick={() => {
            setIsMenuOpen(true);
          }}
          className={twMerge(
            'absolute top-[50%] right-2 -translate-y-1/2 transform cursor-pointer p-3 tracking-[-.02em] transition-opacity ease-in hover:opacity-50 sm:right-3 md:hidden',
            isMenuOpen ? 'hidden' : '',
          )}
        >
          MENU
        </button>
      </header>
      <div
        id={MENU_ID}
        className={twMerge(
          'fixed top-0 left-0 z-30 flex h-full w-full items-center backdrop-blur-xl transition-opacity duration-300 ease-in-out',
          isMenuOpen ? 'opacity-100' : 'invisible opacity-0',
        )}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        <nav className="mb-6 flex flex-col gap-4" aria-label="メイン">
          <ul>
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
        </nav>
        <div className="grow px-4 text-right">
          <button className="absolute top-[calc(50%-24px)] right-2 -translate-y-1/2 cursor-pointer p-3 font-serif text-xs text-stone-600">
            CLOSE
          </button>
        </div>
      </div>
    </>
  );
};
