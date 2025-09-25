import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Container from '@/components/ui/container';

import './globals.css';

const InterFont = Inter({
  variable: '--font-inter',
  subsets: ['latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Time4IT rekru app',
  description: 'Time4IT rekru app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" translate="no">
      <body className={`${InterFont.variable} antialiased`}>
        <Container as="header" className="flex items-center gap-4 py-[34px]">
          <Avatar className="size-14">
            <AvatarImage src="/images/avatar.png" />
            <AvatarFallback>OJ</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl/[30px] font-semibold text-gray-900">Witaj ponownie, Olivia</p>
            <p className="text-base font-normal text-gray-600">16 January, 2025</p>
          </div>
        </Container>
        {children}
      </body>
    </html>
  );
}
