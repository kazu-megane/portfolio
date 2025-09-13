import { Metadata } from 'next';
import Link from 'next/link';
import { ContentContainer } from '@/components/common/ContentContainer';

export const metadata: Metadata = {
  title: 'Archive',
  description:
    'Portfolio of Kazuya Hashimoto, a design engineer and designer, photographer. | デザインエンジニア・デザイナー・フォトグラファー 橋本和也のポートフォリオサイト',
};

export default async function Archive() {
  const links = [
    {
      href: '/archive/photo',
      label: 'PHOTO',
    },
    {
      href: '/archive/video',
      label: 'VIDEO',
    },
  ];

  return (
    <ContentContainer>
      <div className="flex flex-col">
        <section className="flex flex-col items-start md:flex-row md:gap-10">
          <div className="sticky top-[80px] flex w-full shrink-0 flex-col gap-6 md:max-w-[280px]">
            <h2 className="font-serif text-4xl tracking-[.2em] text-stone-500">ARCHIVE</h2>
          </div>
          <div className="mt-10 w-full grow">
            <ul className="grid max-w-[800px] grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="relative grid aspect-[4/3] w-full place-items-end rounded-tr-md rounded-b-md border-2 border-stone-300 bg-stone-100 p-4 font-mono text-sm font-bold text-stone-400 before:absolute before:top-[-6px] before:left-[-2px] before:h-3 before:w-1/3 before:-translate-y-1/2 before:rounded-t-sm before:bg-stone-400 before:content-[''] hover:opacity-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </ContentContainer>
  );
}
