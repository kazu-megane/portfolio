'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const MENU_DATA = [
  { title: 'HOME', href: '/' },
  { title: 'ABOUT', href: '/about' },
  // { title: 'WORKS', href: '#' },
  // { title: 'ARCHIVE', href: '#' },
  { title: 'CONTACT', href: '/contact' },
];
const MENU_ID = 'header-menu';

type Props = {
  className?: string;
};

export const Header = ({ className }: Props) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.querySelector('body')?.classList.add('overflow-hidden');
    } else {
      document.querySelector('body')?.classList.remove('overflow-hidden');
    }
  }, [isMenuOpen]);

  const isTopPage = useMemo(() => pathname === '/', [pathname]);

  return (
    <>
      {!isTopPage && <div className="h-[80px]" />}
      <header
        className={twMerge(
          'fixed z-20 flex w-full justify-between px-4 font-serif text-xs transition-all duration-500 ease-in-out sm:px-6',
          isTopPage
            ? 'top-[calc(50%-24px)] -translate-y-1/2 text-white mix-blend-difference'
            : 'top-0 h-[80px] py-8 text-stone-800',
          className,
        )}
      >
        <h1 className={twMerge('tracking-[.2em]', isMenuOpen ? 'hidden' : '')}>
          <Link
            href="/"
            onClick={(event) => {
              if (isTopPage) {
                event.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            KAZUYA HASHIMOTO
          </Link>
        </h1>
        <nav aria-label="メイン" className="hidden md:block">
          <ul className="flex items-center gap-[80px] tracking-[-.02em] lg:gap-[120px]">
            {MENU_DATA.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  onClick={(event) => {
                    if (pathname === item.href) {
                      event.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={twMerge(
                    'transition-opacity ease-in hover:opacity-50',
                    pathname === item.href ? 'line-through decoration-orange-600 decoration-2' : '',
                    isTopPage ? 'decoration-white' : '',
                  )}
                >
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
                  onClick={(event) => {
                    if (pathname === item.href) {
                      event.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className={twMerge(
                    'font-serif text-lg text-stone-800',
                    pathname === item.href ? 'line-through decoration-orange-600 decoration-2' : '',
                  )}
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
