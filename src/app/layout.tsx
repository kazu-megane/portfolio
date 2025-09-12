import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import type { Metadata } from 'next';
import { Lato, Geist_Mono, Shippori_Mincho } from 'next/font/google';
import { Header } from '@/components/common/Header';
import './globals.css';

const shipporiMincho = Shippori_Mincho({
  variable: '--font-shippori-mincho',
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
});

const lato = Lato({
  variable: '--font-lato',
  weight: ['400', '700'],
  style: ['normal'],
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: 'Kazuya Hashimoto - Portfolio | %s',
    default: 'Kazuya Hashimoto - Portfolio',
  },
  description:
    'Portfolio of Kazuya Hashimoto, a design engineer and designer, photographer. | デザインエンジニア・デザイナー・フォトグラファー 橋本和也のポートフォリオサイト',
  keywords: [
    'Portfolio',
    'ポートフォリオ',
    'Frontend',
    'フロントエンド',
    'Engineer',
    'エンジニア',
    'Design Engineer',
    'デザインエンジニア',
    'Designer',
    'デザイナー',
    'Photographer',
    'フォトグラファー',
  ],
  metadataBase: new URL('https://kazuyaframe.work'),
  openGraph: {
    type: 'website',
    title: 'Kazuya Hashimoto - Portfolio',
    description:
      'Portfolio of Kazuya Hashimoto, a design engineer and designer, photographer. | デザインエンジニア・デザイナー・フォトグラファー 橋本和也のポートフォリオサイト',
    url: 'https://kazuyaframe.work',
    siteName: 'KAZUYA HASHIMOTO',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shipporiMincho.variable} ${lato.variable} ${geistMono.variable} flex min-h-dvh flex-col bg-white antialiased`}
      >
        <Header />
        <main className="flex grow flex-col">{children}</main>
        <footer className="fixed bottom-0 z-10 w-full p-4 text-center font-serif text-sm text-white mix-blend-difference">
          <small>&copy; kazuya hashimoto</small>
        </footer>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
