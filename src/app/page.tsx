import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import { Header } from '@/components/common/Header';
import { MainVisual } from '@/components/top/MainVisual';
import { AnimatedWrapper } from '@/components/common/AnimatedWrapper';

const SectionHeading = ({ text }: { text: string }) => {
  return (
    <div className="sticky top-0 z-10 bg-white px-2 py-6 text-stone-600 md:px-4">
      <h2 className="text-center font-serif text-base tracking-[-.02em] md:text-left md:text-lg">{text}</h2>
    </div>
  );
};

const SectionText = ({ text, className }: { text: string; className?: string }) => {
  return (
    <p className={twMerge('text-center text-xs whitespace-pre-line text-stone-600 md:text-sm', className)}>{text}</p>
  );
};

export default function Home() {
  return (
    <div className="relative flex flex-col bg-white">
      <Header className="fixed top-[calc(50%-24px)] z-20 w-full -translate-y-1/2" />
      <main className="flex grow flex-col">
        <div className="grid h-screen grow place-items-center">
          <MainVisual />
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
                    alt="untitled snapshot"
                    className="aspect-[3/2] object-contain"
                  />
                </AnimatedWrapper>
                <SectionText text={'「 」\nISO 200, F4.0, 1/500s, 35mm'} />
              </div>
              <div className="md:col- flex flex-col gap-2 md:col-start-2 md:row-start-2">
                <AnimatedWrapper>
                  <Image
                    src="/top_snap_2.jpg"
                    width={552}
                    height={368}
                    alt="untitled snapshot"
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
                    alt="spectrum"
                    className="aspect-[3/2] h-full w-full object-contain"
                  />
                </AnimatedWrapper>
                <SectionText text={'「spectrum」\nISO 200, F2.8, 1/25s, 90mm'} />
              </div>
              <div className="md:col- flex flex-col gap-2 md:col-start-2 md:row-start-2">
                <AnimatedWrapper>
                  <Image
                    src="/top_abstract_2.jpg"
                    width={2080}
                    height={3120}
                    alt="fireworks"
                    className="aspect-[3/2] h-full w-full object-contain md:col-start-2 md:row-start-1"
                  />
                </AnimatedWrapper>
                <SectionText
                  text={'「fireworks」\nISO 80, F9.0, 6.0s, 23mm'}
                  className="md:col-start-1 md:row-start-1"
                />
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
