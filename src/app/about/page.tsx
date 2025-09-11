import { Metadata } from 'next';
import { ContentContainer } from '@/components/common/ContentContainer';
import { SNS_DATA } from '@/constants';

export const metadata: Metadata = {
  title: 'Kazuya Hashimoto - Portfolio | About',
  description:
    'Portfolio of Kazuya Hashimoto, a design engineer and designer, photographer. | デザインエンジニア・デザイナー・フォトグラファー 橋本和也のポートフォリオサイト',
};

const Introduction = () => {
  const data: Array<{
    name: string;
    description: string;
  }> = [
    {
      name: '橋本 和也',
      description:
        '東京を拠点に、フロントエンド／デザインエンジニア、UI/UXデザイナー、そしてフォトグラファーとして活動しています。撮影ではスナップ、風景、ポートレートなど、日常の一瞬やその場の空気感を大切に切り取ることを心がけています。',
    },
    {
      name: 'Kazuya Hashimoto',
      description:
        'Based in Tokyo, I work as a front-end/design engineer, UI/UX designer, and photographer. In my photography, I focus on capturing everyday moments and the atmosphere of the scene, including snaps, landscapes, and portraits.',
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {data.map(({ name, description }, index) => (
          <p key={index} className="flex basis-1/2 flex-col gap-6 text-xs tracking-widest">
            <span>{name}</span>
            <span className="leading-[2] whitespace-pre-line">{description}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

const ScopeOfWork = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-serif text-3xl text-stone-500">Scope of Work</h3>
      <ul className="flex flex-col gap-4 text-xs">
        <li>Front-end Development</li>
        <li>UI/UX Design</li>
        <li>Photography</li>
      </ul>
    </div>
  );
};

const SnsLinks = () => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="font-serif text-3xl text-stone-500">SNS Links</h3>
      <ul className="flex gap-3 text-xs">
        {SNS_DATA.map((sns) => (
          <li key={sns.name}>
            <a
              href={sns.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={sns.name}
              className="flex p-1 transition-opacity ease-in hover:opacity-50"
            >
              <sns.icon size={18} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Biography = () => {
  const data: Array<{
    year: string;
    events: string[];
  }> = [
    {
      year: '2018-',
      events: ['LINEヤフー株式会社 入社', 'デザインエンジニアとしてサービス開発に従事'],
    },
    {
      year: '2020-2023',
      events: ['Designship 運営', 'エンジニアチーム、ブランドチーム、スチールチームに所属'],
    },
    {
      year: '2022-',
      events: ['副業での活動開始', 'フロントエンド開発、UI/UXデザイン、ウェディング撮影 etc.'],
    },
  ];

  return (
    <ul className="flex flex-col gap-6">
      {data.map(({ year, events }, index) => (
        <li key={index} className="flex items-baseline gap-4 text-xs">
          <span className="w-20 shrink-0 font-mono text-stone-500">{year}</span>
          <ul className="flex flex-col gap-2">
            {events.map((event, eventIndex) => (
              <li key={eventIndex}>{event}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default function About() {
  return (
    <ContentContainer>
      <div className="flex flex-col gap-20 md:gap-24">
        <section className="flex flex-col items-start md:flex-row md:gap-10">
          <h2 className="sticky top-[80px] w-full max-w-[280px] shrink-0 font-serif text-4xl tracking-[.2em] text-stone-500">
            ABOUT
          </h2>
          <div className="mt-10 flex flex-col gap-16 md:gap-20">
            <Introduction />
            <ScopeOfWork />
            <SnsLinks />
          </div>
        </section>
        <section className="flex flex-col items-start md:flex-row md:gap-10">
          <h2 className="sticky top-[80px] w-full max-w-[280px] shrink-0 font-serif text-4xl tracking-[.2em] text-stone-500">
            BIOGRAPHY
          </h2>
          <div className="mt-10">
            <Biography />
          </div>
        </section>
      </div>
    </ContentContainer>
  );
}
