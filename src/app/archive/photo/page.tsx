import { Metadata } from 'next';
import { ContentContainer } from '@/components/common/ContentContainer';
import { Breadcrumb } from '@/components/common/Breadcrumb';
import { PhotoList } from '@/components/photo/PhotoList';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Archive | Photo',
  description:
    'Portfolio of Kazuya Hashimoto, a design engineer and designer, photographer. | デザインエンジニア・デザイナー・フォトグラファー 橋本和也のポートフォリオサイト',
};

const Loading = () => {
  return (
    <div className="flex h-40 w-full items-center justify-center">
      <span className="animate-pulse font-mono text-stone-400">Loading...</span>
    </div>
  );
};

export default async function Photo() {
  return (
    <ContentContainer>
      <div className="flex flex-col">
        <section className="flex flex-col items-start md:flex-row md:gap-10">
          <div className="sticky top-[80px] z-10 flex w-full shrink-0 flex-col gap-4 md:max-w-[280px]">
            <Breadcrumb />
            <h2 className="font-serif text-3xl tracking-[.2em] text-stone-500">PHOTO</h2>
          </div>
          <div className="mt-4 w-full grow md:mt-10">
            <Suspense fallback={<Loading />}>
              <PhotoList />
            </Suspense>
          </div>
        </section>
      </div>
    </ContentContainer>
  );
}
