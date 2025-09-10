import type { Metadata } from 'next';
import { Lato, Geist_Mono, Hina_Mincho } from 'next/font/google';
import './globals.css';

const hinaMincho = Hina_Mincho({
  variable: '--font-hina-mincho',
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
  title: 'Kazuya Hashimoto - Portfolio',
  description:
    'Portfolio of Kazuya Hashimoto, a design engineer and designer, photographer. | デザインエンジニア・デザイナー・フォトグラファー 橋本和也のポートフォリオサイト',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${hinaMincho.variable} ${lato.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  );
}
