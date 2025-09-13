import { Metadata } from 'next';
import { ContentContainer } from '@/components/common/ContentContainer';
import { Breadcrumb } from '@/components/common/Breadcrumb';

export const metadata: Metadata = {
  title: 'Archive | Video',
  description:
    'Portfolio of Kazuya Hashimoto, a design engineer and designer, photographer. | デザインエンジニア・デザイナー・フォトグラファー 橋本和也のポートフォリオサイト',
};

export default async function Video() {
  return (
    <ContentContainer>
      <div className="flex flex-col">
        <section className="flex flex-col items-start md:flex-row md:gap-10">
          <div className="sticky top-[80px] flex w-full shrink-0 flex-col gap-4 md:max-w-[280px]">
            <Breadcrumb />
            <h2 className="font-serif text-3xl tracking-[.2em] text-stone-500">VIDEO</h2>
          </div>
          <div className="mt-4 w-full grow md:mt-10">
            <p>Video page content goes here.</p>
          </div>
        </section>
      </div>
    </ContentContainer>
  );
}
