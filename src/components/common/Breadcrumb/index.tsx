'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Props = {
  className?: string;
};

export const Breadcrumb = ({ className }: Props) => {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((value) => value);

  return (
    <nav aria-label="現在のページ階層" className={className}>
      <ul className="flex items-center text-sm">
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const href = '/' + pathnames.slice(0, index + 1).join('/');

          return (
            <li key={href} className='after:mx-2 after:content-["/"] last:after:content-none'>
              {isLast ? (
                <span aria-current="page" className="font-bold text-gray-500">
                  {value}
                </span>
              ) : (
                <Link href={href} className="text-blue-500 transition-opacity ease-in hover:opacity-50">
                  {value}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
